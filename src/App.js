import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import CoursesPage from "./components/main components/CoursesPage";
import DashboardPage from "./components/main components/DashboardPage";
import ELibraryPage from "./components/main components/ELibraryPage";
import GenealogyPage from "./components/main components/GenealogyPage";
import MobileNavbar from "./components/main components/MobileNavbar";
import SignInPage from "./components/main components/SignInPage";
import SignUpPage from "./components/main components/SignUpPage";
import TransactionPage from "./components/main components/TransactionPage";
import AllProducts from "./components/market/AllProducts";
import MarketMainPage from "./components/market/MarketMainPage";
import AccountSideBar from "./components/sidebar/AccountSideBar";
import { useSelector } from "react-redux/es/exports";

function App() {
  const shrink = useSelector((store) => store.dummy_data.sidebar_is_shrink);
  const userdata = useSelector((store) => store.user_data);
  const { loginstatus } = userdata;
  return (
    <div className="App">
      <div id="main-cont1" className="main-cont1">
        <div id="main-cont1-item1" className="main-cont1-item1">
          <AccountSideBar />
        </div>
        <div id="main-cont1-item2" className="main-cont1-item2">
          <div className="cont1-item2-main-head">
            <Header showlist={false} />
          </div>
          <div className="cont1-item2-main-body">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/market" element={<MarketMainPage />} />
              <Route path="all-products" element={<AllProducts />} />
              <Route path="/sign_in" element={<SignInPage />} />
              <Route path="/sign_up" element={<SignUpPage />} />
              <Route path="/transactions" element={<TransactionPage />}></Route>
              <Route path="/courses" element={<CoursesPage />}></Route>
              <Route path="/genealogy" element={<GenealogyPage />}></Route>
              <Route path="/e_library" element={<ELibraryPage />}></Route>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
      <MobileNavbar />
    </div>
  );
}

export default App;
