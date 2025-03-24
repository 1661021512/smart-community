// app.ts

import {UserService} from './service/user.service';
import {HttpClient} from './service/http-client';

App<IAppOption>({
	globalData: {},
	onLaunch() {
		// 展示本地存储能力
		const logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs);
	}
});

export interface Root {
	service: {
		httpClient: HttpClient,
		userService: UserService
	};
	onLaunch: () => void
}

const httpClient = new HttpClient();
const userService = new UserService(httpClient);

App<Root>({
	service: {
		httpClient,
		userService
	},
	onLaunch() {
		// 在启动时执行一次，如果启动了小程序，再退出，再进入，不再执行
	},
	onShow: () => {
		// 每次切到小程序界面都执行一次
		userService.login();
	}
});
