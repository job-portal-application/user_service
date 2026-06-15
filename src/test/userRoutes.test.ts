// user.routes.test.ts
import { jest, describe, beforeEach, expect, it } from '@jest/globals';

const mockGet = jest.fn<() => void>();
const mockPut = jest.fn<() => void>();
const mockPost = jest.fn<() => void>();
const mockDelete = jest.fn<() => void>();

const mockRouter = {
    get: mockGet,
    put: mockPut,
    post: mockPost,
    delete: mockDelete,
};

const mockExpress = {
    Router: jest.fn(() => mockRouter),
};

const mockIsAuth = jest.fn();

const mockMyProfile = jest.fn<() => void>();
const mockGetUserProfile = jest.fn<() => void>();
const mockUpdateUserProfile = jest.fn<() => void>();
const mockUpdateProfilePic = jest.fn<() => void>();
const mockUpdateResume = jest.fn<() => void>();
const mockAddSkills = jest.fn<() => void>();
const mockDeleteSkills = jest.fn<() => void>();
const mockApplyForJobs = jest.fn<() => void>();
const mockGetAllApplications = jest.fn<() => void>();

const mockUploadFile = jest.fn();

jest.unstable_mockModule('express', () => ({
    default: mockExpress,
}));

jest.unstable_mockModule('../../src/middleware/auth.js', () => ({
    isAuth: mockIsAuth,
}));

jest.unstable_mockModule('../../src/controllers/userController.js', () => ({
    myProfile: mockMyProfile,
    getUserProfile: mockGetUserProfile,
    updateUserProfile: mockUpdateUserProfile,
    updateProfilePic: mockUpdateProfilePic,
    updateResume: mockUpdateResume,
    addSkills: mockAddSkills,
    deleteSkills: mockDeleteSkills,
    applyForJobs: mockApplyForJobs,
    getAllApplications: mockGetAllApplications,
}));

jest.unstable_mockModule('../../src/middleware/multer.js', () => ({
    default: mockUploadFile,
}));

describe('user routes', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    it('should create express router', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockExpress.Router).toHaveBeenCalled();
    });

    // =========================
    // GET ROUTES
    // =========================

    it('should register my-profile route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockGet as any).toHaveBeenCalledWith(
            '/my-profile',
            mockIsAuth,
            mockMyProfile
        );
    });

    it('should register profile route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockGet as any).toHaveBeenCalledWith(
            '/profile/:userId',
            mockIsAuth,
            mockGetUserProfile
        );
    });

    // =========================
    // PUT ROUTES
    // =========================

    it('should register update-profile route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockPut as any).toHaveBeenCalledWith(
            '/update-profile/:userId',
            mockIsAuth,
            mockUpdateUserProfile
        );
    });

    it('should register update-profile-pic route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockPut as any).toHaveBeenCalledWith(
            '/update-profile-pic/:userId',
            mockIsAuth,
            mockUploadFile,
            mockUpdateProfilePic
        );
    });

    it('should register update-resume route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockPut as any).toHaveBeenCalledWith(
            '/update-resume/:userId',
            mockIsAuth,
            mockUploadFile,
            mockUpdateResume
        );
    });

    // =========================
    // POST ROUTES
    // =========================

    it('should register add skills route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockPost as any).toHaveBeenCalledWith(
            '/skills/add',
            mockIsAuth,
            mockAddSkills
        );
    });

    // =========================
    // DELETE ROUTES
    // =========================

    it('should register delete skills route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockDelete as any).toHaveBeenCalledWith(
            '/skills/delete',
            mockIsAuth,
            mockDeleteSkills
        );
    });

    // =========================
    // call count validations
    // =========================

    it('should register apply for job route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockPost as any).toHaveBeenCalledWith(
            '/apply/:jobId',
            mockIsAuth,
            mockApplyForJobs
        );
    });

    it('should register get all applications route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockGet as any).toHaveBeenCalledWith(
            '/applications',
            mockIsAuth,
            mockGetAllApplications
        );
    });

    it('should register exactly three GET routes', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockGet as any).toHaveBeenCalledTimes(3);
    });

    it('should register exactly three PUT routes', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockPut as any).toHaveBeenCalledTimes(3);
    });

    it('should register exactly two POST routes', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockPost as any).toHaveBeenCalledTimes(2);
    });

    it('should register exactly one DELETE route', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockDelete as any).toHaveBeenCalledTimes(1);
    });

    it('should export router instance', async () => {
        const module =
            await import('../../src/routes/userRoutes.js');

        expect(module.default).toBe(mockRouter);
    });

    // =========================
    // middleware validations
    // =========================

    it('should use auth middleware on all protected routes', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockGet as any).toHaveBeenNthCalledWith(
            1,
            '/my-profile',
            mockIsAuth,
            mockMyProfile
        );

        expect(mockGet as any).toHaveBeenNthCalledWith(
            2,
            '/profile/:userId',
            mockIsAuth,
            mockGetUserProfile
        );

        expect(mockPut as any).toHaveBeenNthCalledWith(
            1,
            '/update-profile/:userId',
            mockIsAuth,
            mockUpdateUserProfile
        );

        expect(mockPost as any).toHaveBeenNthCalledWith(
            1,
            '/skills/add',
            mockIsAuth,
            mockAddSkills
        );

        expect(mockDelete as any).toHaveBeenNthCalledWith(
            1,
            '/skills/delete',
            mockIsAuth,
            mockDeleteSkills
        );

        expect(mockPost as any).toHaveBeenNthCalledWith(
            2,
            '/apply/:jobId',
            mockIsAuth,
            mockApplyForJobs
        );

        expect(mockGet as any).toHaveBeenNthCalledWith(
            3,
            '/applications',
            mockIsAuth,
            mockGetAllApplications
        );
    });

    it('should use upload middleware for upload routes', async () => {
        await import('../../src/routes/userRoutes.js');

        expect(mockPut as any).toHaveBeenNthCalledWith(
            2,
            '/update-profile-pic/:userId',
            mockIsAuth,
            mockUploadFile,
            mockUpdateProfilePic
        );

        expect(mockPut as any).toHaveBeenNthCalledWith(
            3,
            '/update-resume/:userId',
            mockIsAuth,
            mockUploadFile,
            mockUpdateResume
        );
    });
});