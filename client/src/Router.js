import React, {useContext, useEffect, useState} from 'react';

import {Link, Routes, Route, Navigate, useSearchParams, useNavigate, useLocation} from "react-router-dom";

import {AppContextProvider, useAppContext} from './context/AppContext';

// import ProtectedPage from "./middlewares/ProtectedPage";
import Page from "./middlewares/Page";

import Landing from "./pages/landing/Landing"
import Authentication from "./pages/auth/main/Authentication";
import Activation from "./pages/auth/activation/Activation";
import SendResetPasswordMail from "./pages/auth/password_send_reset/SendResetPasswordMail";
import ResetPassword from "./pages/auth/password_reset/ResetPassword";
import Logout from "./pages/auth/logout/Logout";

import Banned from "./pages/auth/status/Banned";
import NoName from "./pages/auth/status/NoName";

import New from './pages/business_client/New';
import Orders from './pages/business_client/Orders';
import Profile from './pages/business_client/profile/Profile';
import NotFound404 from "./pages/NotFound404";
import AdminPage from "./middlewares/AdminPage";
import AdminDashboard from "./pages/manager/AdminDashboard";
import EventPage from "./pages/business_client/EventPage";
import PageNew from "./middlewares/PageNew";
import PageAuthed from "./middlewares/PageAuthed";
import PageAdmin from "./middlewares/PageAdmin";
import AdminAllInOne from "./pages/manager/AdminAllInOne";
import AttendancePage from "./pages/business_client/AttendancePage";


const Router = () => {




	// const [users, setUsers] = useState([])
	// async function getUsers() {
	// 	try {
	// 		const response = await UserService.getUsers();
	// 		setUsers(response.data);
	// 	} catch (e) {
	// 		console.log(e)
	// 	}
	// }

	return (<>

		<Routes>
			{/** Landing Page */}
			{/*<Route path="/" element={*/}
			{/*	//почему при жестком переходе через url на "/" выбрасывает {"message":"Unauthorized","errors":[]} (до этого выбрасывал чето с proxy, пока сервер на запустил) с редиректом обратно. приходится стопить клинт и npm start прописывать*/}
			{/*	// Можно оставить для проверки Middleware*/}
			{/*	// Причина в webpack-dev-server, который работает только с '/' маршрутом*/}
			{/*	// <Page>*/}
			{/*		<Landing />*/}
			{/*	// </Page>*/}
			{/*}/>*/}



			{/** Admin:  */}
			<Route path={'/admin'}>
				<Route index element={
					// <AdminPage>
					// 	<AdminDashboard />
					// </AdminPage>
					<PageAdmin>
						<AdminAllInOne />
					</PageAdmin>
				}/>
			</Route>

			{/** Authentication Pages */}
			<Route path='/authn'>
				<Route index element={
					<PageNew>
						<Authentication />
					</PageNew>
				}/>

				<Route path='logout' element={
					<PageAuthed>
						<Logout />
					</PageAuthed>
				}/>

				{/*<Route path='banned' element={*/}
				{/*	<ProtectedPage>*/}
				{/*		<Banned />*/}
				{/*	</ProtectedPage>*/}
				{/*}/>*/}

				{/*<Route path='no_name' element={*/}
				{/*	<ProtectedPage>*/}
				{/*		<NoName />*/}
				{/*	</ProtectedPage>*/}
				{/*}/>*/}

				{/*<Route path='send-reset' element={<Page><SendResetPasswordMail /></Page>} />*/}
				{/*<Route path='reset' element={<Page><ResetPassword /></Page>} />*/}
				{/*<Route path='activation' element={<Page><Activation /></Page>}/>*/}

			</Route>

			{/** Order-Flow */}
			<Route path='/'>
				<Route index element={
					<PageNew>
						<New />
					</PageNew>
					// <ProtectedPage>
					/*</ProtectedPage>*/
				}/>
			</Route>


			<Route path='/room'>
				{/*<Route index element={*/}
				{/*	<PageNew>*/}
				{/*		<Orders />*/}
				{/*	</PageNew>*/}
				{/*	// <ProtectedPage>*/}
				{/*	// </ProtectedPage>*/}
				{/*}/>*/}

				<Route path={':roomHash'} element={
					// <ProtectedPage>
					<PageNew>
						<EventPage />
					</PageNew>
					// </ProtectedPage>
				}/>
			</Route>


			<Route path='/attendee'>
				{/*<Route index element={*/}
				{/*	<PageNew>*/}
				{/*		<Orders />*/}
				{/*	</PageNew>*/}
				{/*	// <ProtectedPage>*/}
				{/*	// </ProtectedPage>*/}
				{/*}/>*/}

				<Route path={':qrHash'} element={
					// <ProtectedPage>
					<PageNew>
						<AttendancePage />
					</PageNew>
					// </ProtectedPage>
				}/>
			</Route>

			{/** Profile Page */}
			<Route path='/profile' element={
				// <ProtectedPage>
					<Profile />
				// </ProtectedPage>
			}/>

			{/*/!** Chat: Conversations and Messenger *!/*/}
			{/*<Route path={'/chat'}>*/}
			{/*	<Route index element={*/}
			{/*		<ProtectedPage>*/}
			{/*			/!*<ChatPage />*!/*/}
			{/*		</ProtectedPage>*/}
			{/*	}/>*/}
			{/*	<Route path={':id'} element={*/}
			{/*		<ProtectedPage>*/}
			{/*			/!*<ChatPage />*!/*/}
			{/*		</ProtectedPage>*/}
			{/*	}/>*/}
			{/*</Route>*/}


			<Route path={'*'} element={
				// Нужна чтобы несуществующие страницы не отличались от существующих защищенных
				// Хотя какая разница, наверное, здесь можно указывать 404 Not Found
				// <Page>
					<NotFound404 />
				/*</Page>*/
			}/>
		</Routes>
	</>);
}

export default Router;

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
