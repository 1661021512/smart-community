小程序
-----
由于多个项目使用的nodejs以及npm的版本不同，所以需要我们拥有快速切换nodejs版本的能力（npm版本会随之切换）,这时候计算机中安装`nvm`便成了必选项：
[nvm官方安装地址](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating)

macos推荐使用[brew安装](https://formulae.brew.sh/formula/nvm)：`brew install nvm`

> 注意：brew对网络环境要求高，且不会自动走网格中设置的代理。需要在执行安装命令前手动在bash中设置代理，比如：`export http_proxy=127.0.0.1:7890`、`export HTTPS_PROXY=127.0.0.1:7890`

安装完成后，一定要注意看说明，按说明进行一些操作。比如创建`~/.nvm`文件夹，添加环境变量等。环境变量添加完成后，重新启动shell以使其生效。

## 开发环境
1. 微信开发者工具
2. nodejs -> v14.17.0, npm -> 6.13.4
3. webstorm
4. webstorm 插件：wechat mini program support
5. webstorm 插件：wechat weapp support

## 开发步骤
1. 运行微信开发者工具，打码登录。
2. 如果自己有微信公众号，并申请了开发者权限，可以选择相应的公众号。如果没有，请联系leader。
3. 在开发者工具中，选择导入。选择当前项目文件夹，并打开。
4. webstorm打开项目文件夹
5. 执行`npm install`安装依赖
6. 执行`node yunzhi.js`开启监听
7. 进入`src`子目录，执行`npm install`，安装第三方依赖
8. 找到微信开发者工具，依次点击：工具 -> NPM构建
9. 正式按[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)开发
10. 在微信开发都工具中，查看效果

## mockApi
微信小程序中的MockApi虽然能够实现，但由于时间、改写成本等原因，我们没有对其进行改写。当前程序需要的API也比较简单，个数比较少。
我们在当前项目中使用了express来打造MockApi, 详细的使用方法请参数mock-api/reamdme.md.

微信开发者工具原生会验证小程序的请求地址是否位于合法的域名列表中（出于安全角色），所以在使用MockApi时如果不进行任何配置，则会发生请求安全校验错误。

这时候我们需要点击微信开发者工具中右上角的Details按钮，然后允选：`Does not verify valid domain names, web-view.....`来取消对安全域名的验证。

## 发布
1. 执行`node yunzhi.js`后停止。
2. 在微信开发者工具中变更appId
3. 点击微信开发都工具上的uploader按钮（无此按钮说明权限不够）

## 微信避坑相关
微信坑比较多，这是我们对其不太认同的地方。一个企业的成功，应该不仅仅限于金钱。

微信小程序测试账号申请：
https://developers.weixin.qq.com/sandbox
