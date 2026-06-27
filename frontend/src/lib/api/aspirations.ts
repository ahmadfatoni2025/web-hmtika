const API_URL = "http://localhost:5000/api";

export async function getAspirations() {
    const res = await fetch(`${API_URL}/aspirations`);

    if (!res.ok) {
        throw new Error("Gagal mengambil data");
    }

    return res.json();
}

export async function getAspirationStats() {
    const res = await fetch(`${API_URL}/aspirations/stats`);

    if (!res.ok) {
        throw new Error("Gagal mengambil statistik");
    }

    return res.json();
}

export async function createAspiration(data: {
    kategori: string;
    isiAspirasi: string;
    isAnonymous: boolean;
}) {
    const res = await fetch(`${API_URL}/aspirations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}