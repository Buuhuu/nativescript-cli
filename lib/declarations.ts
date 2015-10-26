interface INodePackageManager {
	getCache(): string;
	load(config?: any): IFuture<void>;
	install(packageName: string, pathToSave: string, config?: any): IFuture<any>;
	uninstall(packageName: string, config?: any, path?: string): IFuture<any>;
	cache(packageName: string, version: string, cache?: any): IFuture<IDependencyData>;
	cacheUnpack(packageName: string, version: string, unpackTarget?: string): IFuture<void>;
	view(packageName: string, propertyName: string): IFuture<any>;
	executeNpmCommand(npmCommandName: string, currentWorkingDirectory: string): IFuture<any>;
}

interface INpmInstallationManager {
	getCacheRootPath(): string;
	addToCache(packageName: string, version: string): IFuture<void>;
	cacheUnpack(packageName: string, version: string, unpackTarget?: string): IFuture<void>;
	install(packageName: string, options?: INpmInstallOptions): IFuture<string>;
	getLatestVersion(packageName: string): IFuture<string>;
	getLatestCompatibleVersion(packageName: string): IFuture<string>;
	getCachedPackagePath(packageName: string, version: string): string;
	addCleanCopyToCache(packageName: string, version: string): IFuture<void>;
}

interface INpmInstallOptions {
	pathToSave?: string;
	version?: string;
}

interface IDependencyData {
	name: string;
	version: string;
	nativescript: any;
	dependencies?: IStringDictionary;
	devDependencies?: IStringDictionary;
}

interface IStaticConfig extends Config.IStaticConfig { }

interface IConfiguration extends Config.IConfig {
	ANDROID_DEBUG_UI: string;
	USE_POD_SANDBOX: boolean;
}

interface IApplicationPackage {
	packageName: string;
	time: Date;
}

interface ILockFile {
	lock(): IFuture<void>;
	unlock(): IFuture<void>;
}

interface IOpener {
    open(target: string, appname: string): void;
}

interface IUsbLiveSyncService {
	liveSync(platform: string): IFuture<void>;
}

interface IPlatformSpecificUsbLiveSyncService {
	restartApplication(deviceAppData: Mobile.IDeviceAppData, localToDevicePaths?: Mobile.ILocalToDevicePathData[]): IFuture<void>;
	beforeLiveSyncAction?(deviceAppData: Mobile.IDeviceAppData): IFuture<void>;
	sendPageReloadMessageToDevice(): IFuture<void>;
	sendPageReloadMessageToSimulator(): IFuture<void>;
}

interface IOptions extends ICommonOptions {
	frameworkPath: string;
	frameworkName: string;
	framework: string;
	frameworkVersion: string;
	copyFrom: string;
	linkTo: string;
	release: boolean;
	emulator: boolean;
	symlink: boolean;
	forDevice: boolean;
	client: boolean;
	production: boolean;
	keyStorePath: string;
	keyStorePassword: string;
	keyStoreAlias: string;
	keyStoreAliasPassword: string;
	sdk: string;
	debugTransport: boolean;
	ignoreScripts: boolean;
	tnsModulesVersion: string;
	staticBindings: boolean;
	compileSdk: number;
	port: Number;
	copyTo: string;
}

interface IProjectFilesManager {
	processPlatformSpecificFiles(directoryPath: string, platform: string, excludedDirs?: string[]): IFuture<void>;
}

interface IInitService {
	initialize(): IFuture<void>;
}

/**
 * Provides access to information about installed Android tools and SDKs versions.
 */
interface IAndroidToolsInfo {
	/**
	 * Provides information about installed Android SDKs, Build Tools, Support Library
	 * and ANDROID_HOME environement variable.
	 * @return {IAndroidToolsInfoData} Information about installed Android Tools and SDKs.
	 */
	getToolsInfo(): IFuture<IAndroidToolsInfoData>;

	/**
	 * Validates the information about required Android tools and SDK versions.
	 * @param {any} options Defines if the warning messages should treated as error and if the targetSdk value should be validated as well.
	 * @return {boolean} True if there are detected issues, false otherwise.
	 */
	validateInfo(options?: {showWarningsAsErrors: boolean, validateTargetSdk: boolean}): IFuture<boolean>;

	/**
	 * Validates the information about required JAVA version.
	 * @param {string} installedJavaVersion The JAVA version that will be checked.
	 * @param {any} options Defines if the warning messages should treated as error.
	 * @return {boolean} True if there are detected issues, false otherwise.
	 */
	validateJavacVersion(installedJavaVersion: string, options?: {showWarningsAsErrors: boolean}): IFuture<boolean>;

	/**
	 * Returns the path to `android` executable. It should be `$ANDROID_HOME/tools/android`.
	 * In case ANDROID_HOME is not defined, check if `android` is part of $PATH.
	 * @return {string} Path to the `android` executable.
	 */
	getPathToAndroidExecutable(): IFuture<string>;

	/**
	 * Gets the path to `adb` executable from ANDROID_HOME. It should be `$ANDROID_HOME/platform-tools/adb` in case it exists.
	 * @return {string} Path to the `adb` executable. In case it does not exists, null is returned.
	 */
	getPathToAdbFromAndroidHome(): IFuture<string>;
}

/**
 * Describes information about installed Android tools and SDKs.
 */
interface IAndroidToolsInfoData {
	/**
	 * The value of ANDROID_HOME environment variable.
	 */
	androidHomeEnvVar: string;

	/**
	 * The latest installed version of Android Build Tools that satisfies CLI's requirements.
	 */
	buildToolsVersion: string;

	/**
	 * The latest installed version of Android SDK that satisfies CLI's requirements.
	 */
	compileSdkVersion: number;

	/**
	 * The latest installed version of Android Support Repository that satisfies CLI's requirements.
	 */
	supportRepositoryVersion: string;

	/**
	 * The Android targetSdkVersion specified by the user.
	 * In case it is not specified, compileSdkVersion will be used for targetSdkVersion.
	 */
	targetSdkVersion: number;
}

interface ISocketProxyFactory {
	createSocketProxy(factory: () => any): IFuture<any>;
}

interface IiOSNotification {
	waitForDebug: string;
	attachRequest: string;
	appLaunching: string;
	readyForAttach: string;
	attachAvailabilityQuery: string;
	alreadyConnected: string;
	attachAvailable: string;
}

interface IiOSNotificationService {
	awaitNotification(npc: Mobile.INotificationProxyClient, notification: string, timeout: number): IFuture<string>;
}

interface IiOSSocketRequestExecutor {
	executeLaunchRequest(device: Mobile.IiOSDevice, timeout: number, readyForAttachTimeout: number): IFuture<void>;
	executeAttachRequest(device: Mobile.IiOSDevice, timeout: number): IFuture<void>;
}
