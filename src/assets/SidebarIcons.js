import ApartmentIcon from "@mui/icons-material/Apartment";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import InfoIcon from "@mui/icons-material/Info";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CallIcon from "@mui/icons-material/Call";
import SettingsIcon from "@mui/icons-material/Settings";
import BarChartIcon from "@mui/icons-material/BarChart";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import All_Icons from "./All_Icons";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";

const {
  HomeRoundedIcon,
  MenuBookIcon,
  SignalCellular4BarRoundedIcon,
  ThumbUpIcon,
  StoreRoundedIcon,
  LoginIcon,
  LogoutIcon,
} = All_Icons;

export const Home_SideBar_Info = [
  {
    text: "Home",
    icon: <HomeRoundedIcon />,
    link: "/",
  },
  {
    text: "About",
    icon: <InfoIcon />,
    link: "/",
  },
  {
    text: "Services",
    icon: <MiscellaneousServicesIcon />,
    link: "/",
  },
  {
    text: "Compesation Plan",
    icon: <EmojiEventsIcon />,
    link: "/",
  },
  {
    text: "Contact",
    icon: <CallIcon />,
    link: "/",
  },
];
//--------------------------------------------------------------
export const Account_Sidebar_info = [
  {
    id: "dashboard",
    text: "Dashboard",
    icon: <HomeRoundedIcon />,
    link: "/dashboard",
  },
  { id: "social", text: "Go Social", icon: <ThumbUpIcon />, link: "/social" },
  { id: "swap", text: "Swap", icon: <SwapHorizRoundedIcon />, link: "/swap" },
  {
    id: "market",
    text: "Market Place",
    icon: <StoreRoundedIcon />,
    link: "/market",
  },
  {
    id: 6,
    text: "Transactions",
    icon: <BarChartIcon />,
    link: "/transactions",
  },
  // { id: 7, text: "Genealogy", icon: <MilitaryTechIcon />, link: "/genealogy" },
];

export {
  ApartmentIcon,
  SettingsIcon,
  LoginIcon,
  LogoutIcon,
  ManageAccountsIcon,
};
