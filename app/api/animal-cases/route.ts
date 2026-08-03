import { NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/email";
import { getRehabberListings, matchRehabbers } from "@/lib/rehabbers";
import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";
import { animalCaseSchema } from "@/lib/validation";
import { asBoolean, asOptionalString, makeCaseNumber } from "@/lib/utils";

export async function POST(request: Request) {
  const formData = await request.formData();
  const parsed = animalCaseSchema.safeParse({
    finder_name: asOptionalString(formData.get("finder_name")),
    finder_phone: asOptionalString(formData.get("finder_phone")),
    finder_email: asOptionalString(formData.get("finder_email")),
    preferred_contact_method: asOptionalString(formData.get("preferred_contact_method")) || "any",
    animal_type: asOptionalString(formData.get("animal_type")),
    approximate_age: asOptionalString(formData.get("approximate_age")),
    condition: asOptionalString(formData.get("condition")),
    description: asOptionalString(formData.get("description")),
    location_text: asOptionalString(formData.get("location_text")),
    county: asOptionalString(formData.get("county")),
    currently_contained: asBoolean(formData.get("currently_contained")),
    immediate_danger: asBoolean(formData.get("immediate_danger")),
    visible_injury: asBoolean(formData.get("visible_injury")),
    displacement_context: asOptionalString(formData.get("displacement_context")),
    consent_to_share: asBoolean(formData.get("consent_to_share"))
  });

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const caseNumber = makeCaseNumber();
  const supabase = getSupabaseAdmin();
  const { listings, isDemo: listingsAreDemo } = await getRehabberListings();
  const matches = matchRehabbers(listings, { animalType: parsed.data.animal_type, county: parsed.data.county });

  if (!hasSupabaseAdminConfig() || !supabase) {
    return NextResponse.json({
      ok: true,
      configured: false,
      caseNumber,
      message: "Thank you for sharing the details. Save this reference number, and contact a licensed wildlife rehabilitator or local authority directly if the situation is urgent.",
      matches,
      matchesAreDemo: listingsAreDemo
    });
  }

  const { data: animalCase, error } = await supabase
    .from("animal_cases")
    .insert({
      ...parsed.data,
      public_case_number: caseNumber
    })
    .select("id, public_case_number")
    .single();

  if (error) {
    console.error("Animal case save failed", error);
    return NextResponse.json(
      { ok: false, message: "We could not save the case right now. Please try again, or contact a licensed wildlife rehabilitator or local authority directly if the situation is urgent." },
      { status: 500 }
    );
  }

  const photos = formData.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);

  for (const photo of photos.slice(0, 5)) {
    const extension = photo.name.split(".").pop() || "jpg";
    const safeExtension = extension.replace(/[^a-z0-9]/gi, "").toLowerCase() || "jpg";
    const storagePath = `${animalCase.id}/${crypto.randomUUID()}.${safeExtension}`;

    const upload = await supabase.storage
      .from("animal-case-photos")
      .upload(storagePath, photo, {
        contentType: photo.type || "application/octet-stream",
        upsert: false
      });

    if (!upload.error) {
      await supabase.from("animal_case_photos").insert({
        animal_case_id: animalCase.id,
        storage_path: storagePath,
        content_type: photo.type
      });
    }
  }

  await notifyAdmin({
    subject: `New wildlife case ${animalCase.public_case_number}`,
    html: `<p>A new animal case was submitted.</p><p><strong>Animal:</strong> ${parsed.data.animal_type}</p><p><strong>Location:</strong> ${parsed.data.location_text}</p><p><strong>Description:</strong> ${parsed.data.description}</p>`
  });

  return NextResponse.json({
    ok: true,
    configured: true,
    caseNumber: animalCase.public_case_number,
    message: "Thank you. The team can now review the details and help connect the animal with appropriate guidance.",
    matches,
    matchesAreDemo: listingsAreDemo
  });
}
