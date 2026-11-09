"use server";

export type FormState = {
  success: boolean;
  message: string;
  errors: {
    nama?: string;
    email?: string;
    jumlah?: string;
  };
};

export async function kirimPesan(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const nama = String(formData.get("nama") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const jumlah = Number(formData.get("jumlah"));
  const sisaKuota = Number(formData.get("sisaKuota"));

  const errors: FormState["errors"] = {};

  // Validasi nama
  if (!nama) {
    errors.nama = "Nama wajib diisi.";
  }

  // Validasi email
  if (!email) {
    errors.email = "Email wajib diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Format email tidak valid.";
  }

  // Validasi jumlah tiket
  if (!Number.isInteger(jumlah) || jumlah < 1) {
    errors.jumlah = "Jumlah tiket minimal 1.";
  } else if (!Number.isInteger(sisaKuota) || jumlah > sisaKuota) {
    errors.jumlah = "Jumlah tiket melebihi sisa kuota.";
  }

  // Jika ada kesalahan
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Periksa kembali formulir kamu.",
      errors,
    };
  }

  return {
    success: true,
    message: "Data berhasil divalidasi.",
    errors: {},
  };
}
