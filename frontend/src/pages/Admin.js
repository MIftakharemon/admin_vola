import React, { useEffect } from 'react';

// js
import '../assets/js/main.min.js';

// router
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// css
import '../assets/css/main.min.css';
import '../assets/css/custom.css';

// components
import Navbar from '../component/navbar/Navbar';
import Topnav from '../component/navbar/Topnav';
import CoinPlanTable from '../component/table/CoinPlan';
import PurchaseCoinPlanHistoryTable from '../component/table/PurchaseCoinPlanHistory';
import VIPPlanTable from '../component/table/VIPPlan';
import PurchaseVIPPlanTable from '../component/table/PurchaseVipPlanHistory';
import GiftCategoryTable from '../component/table/GiftCategory';
import GiftTable from '../component/table/Gift';
import SongTable from '../component/table/Song';
import SongDialog from '../component/dialog/Song';
import GiftDialog from '../component/dialog/Gift/Add';
import HashtagTable from '../component/table/Hashtag';
import LevelTable from '../component/table/Level';
import UserTable from '../component/table/User';
import PostTable from '../component/table/Post';
import VideoTable from '../component/table/Video';
import UserDetail from './UserDetail';
import UserHistory from './UserHistory';
import PostDetail from './PostDetail';
import VideoDetail from './VideoDetail';
import Dashboard from './Dashboard';
import Setting from './Settings';
import ThemeTable from '../component/table/Theme';
import Advertisement from '../component/table/Advertisement';
import ReportedUserTable from '../component/table/ReportedUser';
import StickerTable from '../component/table/Sticker';
import FakeUser from '../component/table/FakeUser';
import FakeUserPage from '../component/dialog/FakeUserPage';
import Banner from '../component/table/Banner';
import Reaction from '../component/table/Reaction';
import Profile from './Profile';
import GameHistory from '../component/table/GameHistory';
import Avatar from '../component/table/Avatar';
import AdmissionCar from '../component/table/AdmissionCar';
import UserRedeemRequest from '../component/table/userRedeem/UserRedeemRequest';
import HostRequest from '../component/table/hostRequest/HostRequest';
import CoinSellerHistory from '../component/table/CoinSellerHistory';


import FakePost from '../component/table/FakePost.js';
import FakeComment from '../component/table/FakeComment.js';
import FakeVideo from '../component/table/FakeVideo.js';
import Agency from './Agency';
import AgencyWiseHost from './AgencyWiseHost';
import AgencyRedeemRequest from '../component/table/agencyRedeem/AgencyRedeemRequest';
import AgencyHistory from './AgencyHistory.js';
import ComplainRequest from '../component/table/complain/ComplainRequest';
import FakePkUserPage from '../component/dialog/FakePkUserPage.js';
import FakeAudioUserPage from '../component/dialog/FakeAudioUserPage.js';
import FakePostPage from '../component/dialog/FakePostPage.js';
import FakeVideoPage from '../component/dialog/FakeVideoPage.js';
import MainPost from './MainPost.js';
import MainVideo from './MainVideo.js';
import MainPlan from './MainPlan.js';
import PlanHistory from './PlanHistory.js';
import Host from '../component/table/Host.js';
import SuggestedMessage from '../component/table/SuggestedMessage.js';
import BroadcastGift from '../component/table/BroadcastGift.js';
import BroadcastGame from '../component/table/BroadcastGame.js';
import { PermissionProvider } from '../context/PermissionProvider';
import RequireModulePermission from '../util/RequireModulePermission';

const Admin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname === '/admin' ||
      location.pathname === '/admin/dashboard'
    ) {
      navigate('/admin/dashboard');
    }
  }, [location.pathname, navigate]);

  return (
    <PermissionProvider>
      <div className="page-container">
        <Navbar />
        <div className="page-content">
          <Topnav />
          <div className="main-wrapper">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/banner"
                element={
                  <RequireModulePermission module="admin/banner">
                    <Banner />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/adminProfile"
                element={
                  <RequireModulePermission module="admin/adminProfile">
                    <Profile />
                  </RequireModulePermission>
                }
              />
              {/* Plan Module  */}
              <Route
                path="/mainPlan"
                element={
                  <RequireModulePermission module="admin/mainPlan">
                    <MainPlan />
                  </RequireModulePermission>
                }
              />
              <Route path="/coinplan" element={<CoinPlanTable />} />
              <Route path="/vipplan" element={<VIPPlanTable />} />

              {/* Plan History Module  */}
              <Route
                path="/planHistory"
                element={
                  <RequireModulePermission module="admin/planHistory">
                    <PlanHistory />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/coinplan/history"
                element={<PurchaseCoinPlanHistoryTable />}
              />
              <Route
                path="/vipplan/history"
                element={<PurchaseVIPPlanTable />}
              />

              <Route
                path="/giftCategory"
                element={
                  <RequireModulePermission module="admin/giftCategory">
                    <GiftCategoryTable />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/gameHistory"
                element={
                  <RequireModulePermission module="admin/gameHistory">
                    <GameHistory />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/reaction"
                element={
                  <RequireModulePermission module="admin/reaction">
                    <Reaction />
                  </RequireModulePermission>
                }
              />
              <Route
                path={`/comment`}
                element={
                  <RequireModulePermission module="admin/comment">
                    <FakeComment />
                  </RequireModulePermission>
                }
              />

              <Route
                path="/agency"
                element={
                  <RequireModulePermission module="admin/agency">
                    <Agency />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/agencyHistory"
                element={
                  <RequireModulePermission module="admin/agencyHistory">
                    <AgencyHistory />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/agencyRedeemRequest"
                element={
                  <RequireModulePermission module="admin/agencyRedeemRequest">
                    <AgencyRedeemRequest />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/agency/agencyWiseHost"
                element={<AgencyWiseHost />}
              />

              <Route
                path="/broadcastgift"
                element={
                  <RequireModulePermission module="admin/broadcastgift">
                    <BroadcastGift />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/broadcastgame"
                element={
                  <RequireModulePermission module="admin/broadcastgame">
                    <BroadcastGame />
                  </RequireModulePermission>
                }
              />


              <Route
                path="/agency/agencyWiseHost"
                element={<AgencyWiseHost />}
              />
              <Route
                path="/theme"
                element={
                  <RequireModulePermission module="admin/theme">
                    <ThemeTable />
                  </RequireModulePermission>
                }
              />
              <Route path="/fake/fakeUserdialog" element={<FakeUserPage />} />
              <Route
                path="/fake/fakePkUserdialog"
                element={<FakePkUserPage />}
              />
              <Route path="/fake/fakeUserdialog" element={<FakeUserPage />} />
              <Route
                path="/fake/fakeAudioUserdialog"
                element={<FakeAudioUserPage />}
              />

              <Route
                path="/gift"
                element={
                  <RequireModulePermission module="admin/gift">
                    <GiftTable />
                  </RequireModulePermission>
                }
              />
              <Route path="/gift/dialog" element={<GiftDialog />} />
              <Route
                path="/song"
                element={
                  <RequireModulePermission module="admin/song">
                    <SongTable />
                  </RequireModulePermission>
                }
              />
              <Route path="/song/dialog" element={<SongDialog />} />
              <Route
                path="/hashtag"
                element={
                  <RequireModulePermission module="admin/hashtag">
                    <HashtagTable />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/level"
                element={
                  <RequireModulePermission module="admin/level">
                    <LevelTable />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/suggestMessage"
                element={
                  <RequireModulePermission module="admin/suggestMessage">
                    <SuggestedMessage />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/user"
                element={
                  <RequireModulePermission module="admin/user">
                    <UserTable />
                  </RequireModulePermission>
                }
              />
              <Route
                path={`/fakeUser`}
                element={
                  <RequireModulePermission module="admin/fakeUser">
                    <FakeUser />
                  </RequireModulePermission>
                }
              />
              <Route path="/user/detail" element={<UserDetail />} />
              <Route path="/user/history" element={<UserHistory />} />

              {/* Post module  */}
              <Route
                path="/mainPost"
                element={
                  <RequireModulePermission module="admin/mainPost">
                    <MainPost />
                  </RequireModulePermission>
                }
              />
              <Route path="/post" element={<PostTable />} />
              <Route path="/post/fake" element={<FakePost />} />
              <Route path="/post/detail" element={<PostDetail />} />
              <Route path="/post/dialog" element={<FakePostPage />} />

              {/* Video Module  */}
              <Route
                path="/mainVideo"
                element={
                  <RequireModulePermission module="admin/mainVideo">
                    <MainVideo />
                  </RequireModulePermission>
                }
              />
              <Route path="/video" element={<VideoTable />} />
              <Route path="/video/fake" element={<FakeVideo />} />
              <Route path="/video/detail" element={<VideoDetail />} />
              <Route path="/video/dialog" element={<FakeVideoPage />} />

              <Route
                path="/setting"
                element={
                  <RequireModulePermission module="admin/Setting">
                    <Setting />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/reportedUser"
                element={
                  <RequireModulePermission module="admin/reportedUser">
                    <ReportedUserTable />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/advertisement"
                element={
                  <RequireModulePermission module="admin/advertisement">
                    <Advertisement />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/coinSeller/history"
                element={<CoinSellerHistory />}
              />
              <Route
                path="/userRedeemRequest"
                element={
                  <RequireModulePermission module="admin/userRedeemRequest">
                    <UserRedeemRequest />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/coinSeller/history"
                element={<CoinSellerHistory />}
              />
              <Route
                path="/userRedeemRequest"
                element={<UserRedeemRequest />}
              />
              <Route
                path="/hostRequest"
                element={
                  <RequireModulePermission module="admin/hostRequest">
                    <HostRequest />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/host"
                element={
                  <RequireModulePermission module="admin/host">
                    <Host />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/sticker"
                element={
                  <RequireModulePermission module="admin/sticker">
                    <StickerTable />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/avatarFrame"
                element={
                  <RequireModulePermission module="admin/avatarFrame">
                    <Avatar />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/entryEffect"
                element={
                  <RequireModulePermission module="admin/entryEffect">
                    <AdmissionCar />
                  </RequireModulePermission>
                }
              />
              <Route
                path="/complainRequest"
                element={
                  <RequireModulePermission module="admin/complainRequest">
                    <ComplainRequest />
                  </RequireModulePermission>
                }
              />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </div>
    </PermissionProvider>
  );
};

export default Admin;
