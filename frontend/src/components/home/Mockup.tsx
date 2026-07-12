import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    GraduationCap,
    ClipboardList,
    Monitor,
    Palette,
    Bot,
    MessageSquare,
    BookOpen,
    DollarSign,
} from "lucide-react";

const tabItems = [
    { label: "Ecosystem", id: "ecosystem" },
    { label: "Devcamp", id: "devcamp" },
    { label: "Aspirasi", id: "aspirasi" },
];

interface MockRow {
    no: number;
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    balance: string;
    label: string;
    desc: string;
    provider: string;
    date: string;
}

const mockData: Record<string, MockRow[]> = {
    ecosystem: [
        {
            no: 1,
            icon: Building2,
            name: "Devcamp HMTIKA",
            balance: "89 Projects",
            label: "Active",
            desc: "Platform inovasi dan pengembangan",
            provider: "HMTIKA",
            date: "12 Jul 2026",
        },
        {
            no: 2,
            icon: GraduationCap,
            name: "Program Beasiswa",
            balance: "34 Penerima",
            label: "Assets",
            desc: "Beasiswa prestasi akademik",
            provider: "STMIK TB",
            date: "20 Mar 2026",
        },
        {
            no: 3,
            icon: ClipboardList,
            name: "Event Informatika",
            balance: "12 Events",
            label: "Assets",
            desc: "Kegiatan seminar dan lomba",
            provider: "BEM STTB",
            date: "05 Apr 2026",
        },
    ],
    devcamp: [
        {
            no: 1,
            icon: Monitor,
            name: "Bootcamp Web Dev",
            balance: "45 Peserta",
            label: "Active",
            desc: "Pelatihan intensif frontend & backend",
            provider: "HMTIKA",
            date: "18 Agt 2026",
        },
        {
            no: 2,
            icon: Palette,
            name: "UI/UX Masterclass",
            balance: "28 Peserta",
            label: "Completed",
            desc: "Desain antarmuka pengguna modern",
            provider: "STMIK TB",
            date: "10 Mei 2026",
        },
        {
            no: 3,
            icon: Bot,
            name: "AI & Data Science",
            balance: "60 Peserta",
            label: "Active",
            desc: "Dasar-dasar kecerdasan buatan",
            provider: "BEM STTB",
            date: "01 Nov 2026",
        },
    ],
    aspirasi: [
        {
            no: 1,
            icon: MessageSquare,
            name: "Keluhan Fasilitas Lab",
            balance: "15 Votes",
            label: "Pending",
            desc: "Perbaikan AC dan komputer lab 3",
            provider: "HMTIKA",
            date: "09 Jul 2026",
        },
        {
            no: 2,
            icon: BookOpen,
            name: "Usulan Buku Baru",
            balance: "42 Votes",
            label: "Approved",
            desc: "Penambahan referensi buku programming",
            provider: "STMIK TB",
            date: "14 Jun 2026",
        },
        {
            no: 3,
            icon: DollarSign,
            name: "Request Dana Ormawa",
            balance: "8 Votes",
            label: "Rejected",
            desc: "Pengajuan anggaran event nasional",
            provider: "BEM STTB",
            date: "29 Jun 2026",
        },
    ],
};

const getBadgeStyles = (label: string) => {
    switch (label.toLowerCase()) {
        case "active":
        case "approved":
            return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
        case "assets":
        case "completed":
            return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        case "pending":
            return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        case "rejected":
            return "bg-red-500/10 text-red-400 border-red-500/20";
        default:
            return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
};

const getDotColor = (label: string) => {
    switch (label.toLowerCase()) {
        case "active":
        case "approved":
            return "bg-emerald-500";
        case "assets":
        case "completed":
            return "bg-blue-500";
        case "pending":
            return "bg-amber-500";
        case "rejected":
            return "bg-red-500";
        default:
            return "bg-zinc-500";
    }
};

const containerVariants = {
    enter: {
        transition: { staggerChildren: 0.05, delayChildren: 0.04 },
    },
    exit: {
        transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
};

const rowVariants = {
    enter: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        y: -8,
        transition: { duration: 0.2 },
    },
};

export default function Mockup() {
    const [activeTab, setActiveTab] = useState("ecosystem");

    return (
        <>
            <div className="relative z-10 mx-auto mt-6 px-4 max-w-5xl flex flex-col gap-4">


                {/* Main Window Dashboard */}
                <div
                    className="w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl"
                    style={{
                        boxShadow:
                            "0 32px 80px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                    }}
                >
                    {/* Window Chrome Bar */}
                    <div className="flex items-center gap-4 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                            <span className="text-xs font-semibold text-zinc-200">Workspace</span>
                        </div>
                        <div className="flex items-center gap-4 ml-4 text-xs text-zinc-400">
                            <span>File</span>
                            <span>Edit</span>
                            <span>View</span>
                        </div>
                        <div className="ml-auto flex gap-3 text-zinc-500 text-xs">
                            <span>Public 🌐</span>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/30">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-300 border border-zinc-800 rounded-md px-2 py-1 cursor-pointer hover:bg-zinc-800 bg-zinc-900 transition-colors">
                            <span>⚙</span>
                            <span>Filter</span>
                            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-zinc-100 text-zinc-900 text-[9px] font-bold">
                                {mockData[activeTab].length}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-300 border border-zinc-800 rounded-md px-2 py-1 cursor-pointer hover:bg-zinc-800 bg-zinc-900 transition-colors">
                            <span>↕</span>
                            <span>Sort</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 border border-zinc-800 rounded-md px-3 py-1 bg-zinc-900/80 flex-1 max-w-48">
                            <span>🔍</span>
                            <span className="text-zinc-500">Cari di {tabItems.find(t => t.id === activeTab)?.label}...</span>
                        </div>
                        <div className="ml-auto">
                            <button className="text-xs text-zinc-300 border border-zinc-800 rounded-md px-3 py-1 hover:bg-zinc-800 bg-zinc-900 transition-colors font-medium">
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 px-4 py-2 text-[11px] font-semibold text-zinc-400 border-b border-zinc-800 bg-zinc-900/10">
                        <div className="col-span-1">#</div>
                        <div className="col-span-3">Program / Topik</div>
                        <div className="col-span-2">Metrik</div>
                        <div className="col-span-1">Status</div>
                        <div className="col-span-3">Deskripsi</div>
                        <div className="col-span-1">Pengelola</div>
                        <div className="col-span-1 text-right">Tanggal</div>
                    </div>

                    {/* Table Rows */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={containerVariants}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                            className="divide-y divide-zinc-900"
                        >
                            {mockData[activeTab].map((row) => (
                                <motion.div
                                    key={row.no}
                                    variants={rowVariants}
                                    className="grid grid-cols-12 px-4 py-3 text-xs text-zinc-300 hover:bg-zinc-900/40 transition-colors cursor-pointer items-center"
                                >
                                    <div className="col-span-1 text-zinc-600">{row.no}</div>
                                    <div className="col-span-3 flex items-center gap-2 font-medium text-zinc-100">
                                        <row.icon className="w-4 h-4 text-zinc-300" />
                                        {row.name}
                                    </div>
                                    <div className="col-span-2 font-mono font-semibold text-zinc-100">{row.balance}</div>
                                    <div className="col-span-1">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${getBadgeStyles(row.label)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(row.label)}`} />
                                            {row.label}
                                        </span>
                                    </div>
                                    <div className="col-span-3 text-zinc-400 truncate pr-4">{row.desc}</div>
                                    <div className="col-span-1 flex items-center gap-1">
                                        <span className="w-4 h-4 rounded-sm bg-zinc-100 flex items-center justify-center text-zinc-900 text-[8px] font-bold">{row.provider[0]}</span>
                                        <span className="text-zinc-400">{row.provider}</span>
                                    </div>
                                    <div className="col-span-1 text-right text-zinc-500">{row.date}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>


                {/* Feature Tabs (Dark Mode Optimized) */}
                <div className="flex items-center gap-1 bg-zinc-400/5 backdrop-blur-md border border-zinc-100/20 rounded-full px-1 py-1 group-hover:bg-zinc-400/10 group-hover:border-zinc-100/20 transition-all duration-200  shadow-md w-fit justify-center mx-auto">
                    {tabItems.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${activeTab === tab.id
                                ? "bg-zinc-100 text-zinc-900 shadow-sm"
                                : "text-zinc-400 hover:text-zinc-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}