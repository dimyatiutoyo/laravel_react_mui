import {
    AdminPanelSettingsOutlined,
    DescriptionOutlined,
    HomeOutlined,
    PeopleAltOutlined,
    LocalOfferOutlined,
    LocalPoliceOutlined,
} from "@mui/icons-material";

const menus = [
    {
        title: "Dashboard",
        icon: <HomeOutlined />,
        to: "/dashboard",
        can: ["view-dashboard"],
        active: "/dashboard",
    },
    {
        title: "Jenis Laporan",
        icon: <DescriptionOutlined />,
        to: "/jenis-laporan",
        can: ["view-jenis-laporan"],
        active: "/jenis-laporan",
    },
    {
        title: "Indikator",
        icon: <LocalOfferOutlined />,
        to: "/indikator",
        can: ["view-indikator"],
        active: "/indikator",
    },
    {
        title: "User",
        icon: <PeopleAltOutlined />,
        to: "/user",
        can: ["view-user"],
        active: "/user",
    },
    {
        title: "Role",
        icon: <AdminPanelSettingsOutlined />,
        to: "/role",
        can: ["view-role"],
        active: "/role",
    },
    {
        title: "Permission",
        icon: <LocalPoliceOutlined />,
        to: "/permission",
        can: ["view-permission"],
        active: "/permission",
    },
    {
        title: "Tool Kit",
        icon: <LocalPoliceOutlined />,
        to: "/tool-kit",
        can: ["view-tool-kit"],
        active: "/tool-kit",
    },
];

export default menus;
