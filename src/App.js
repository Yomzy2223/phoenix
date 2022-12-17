import { Route, Routes } from "react-router-dom";
import "./App.css";
import SwapPage from "./components/main components/SwapPage";
import DashboardPage from "./components/main components/DashboardPage";
import ELibraryPage from "./components/main components/SocialPage";
import SignInPage from "./components/main components/SignInPage";
import SignUpPage from "./components/main components/SignUpPage";
import TransactionPage from "./components/main components/TransactionPage";
import AllProducts from "./components/market/AllProducts";
import MarketMain from "./components/market/MarketMain";
import SocialPage from "./components/main components/SocialPage";
import MorePage from "./components/main components/MorePage";
import Homepage from "./components/main components/Homepage";
import MarketPage from "./components/main components/MarketPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route index element={<DashboardPage />} />
          <Route path="market" element={<MarketPage />}>
            <Route index element={<MarketMain />} />
            <Route path="all-products" element={<AllProducts />} />
            {/* <Route path=":searched" element={<AllProducts />} /> */}
          </Route>
          <Route path="sign_in" element={<SignInPage />} />
          <Route path="sign_up" element={<SignUpPage />} />
          <Route path="transactions" element={<TransactionPage />}></Route>
          <Route path="swap" element={<SwapPage />}></Route>
          <Route path="social" element={<SocialPage />}></Route>
          <Route path="e_library" element={<ELibraryPage />}></Route>
          <Route path="more" element={<MorePage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// <div id="main-cont1" className="main-cont1">
//   <div id="main-cont1-item1" className="main-cont1-item1">
//     <AccountSideBar />
//   </div>
//   <div id="main-cont1-item2" className="main-cont1-item2">
//     <div className="cont1-item2-main-head">
//       <Header showlist={false} />
//     </div>
//     <div className="cont1-item2-main-body">
//       <Routes>
//         <Route path="/" element={<Homepage />}>
//           <Route index element={<DashboardPage />} />
//           <Route path="dashboard" element={<DashboardPage />} />
//           <Route path="market" element={<MarketMainPage />} />
//           <Route path="all-products" element={<AllProducts />} />
//           <Route path="sign_in" element={<SignInPage />} />
//           <Route path="sign_up" element={<SignUpPage />} />
//           <Route path="transactions" element={<TransactionPage />}></Route>
//           <Route path="swap" element={<SwapPage />}></Route>
//           <Route path="social" element={<SocialPage />}></Route>
//           <Route path="e_library" element={<ELibraryPage />}></Route>
//           <Route path="more" element={<MorePage />}></Route>
//         </Route>
//       </Routes>
//     </div>
//     <Footer />
//   </div>
// </div>;
// {
//   /* <Footer /> */
// }
// <MobileNavbar />;
