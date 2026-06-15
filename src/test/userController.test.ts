// user.controller.test.ts
import { jest, describe, beforeEach, expect, it } from '@jest/globals';

const mockMyProfile = jest.fn<any>();
const mockGetUserProfile = jest.fn<any>();
const mockUpdateUserProfile = jest.fn<any>();
const mockUpdateProfilePic = jest.fn<any>();
const mockUpdateResume = jest.fn<any>();
const mockAddSkills = jest.fn<any>();
const mockDeleteSkills = jest.fn<any>();
const mockApplyForJobs = jest.fn<any>();
const mockGetAllApplications = jest.fn<any>();

jest.unstable_mockModule('../../src/services/userService.js', () => ({
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

describe('user controller', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();

        mockMyProfile.mockResolvedValue(undefined);
        mockGetUserProfile.mockResolvedValue(undefined);
        mockUpdateUserProfile.mockResolvedValue(undefined);
        mockUpdateProfilePic.mockResolvedValue(undefined);
        mockUpdateResume.mockResolvedValue(undefined);
        mockAddSkills.mockResolvedValue(undefined);
        mockDeleteSkills.mockResolvedValue(undefined);
        mockApplyForJobs.mockResolvedValue(undefined);
        mockGetAllApplications.mockResolvedValue(undefined);
    });

    // =========================
    // myProfile
    // =========================

    it('should call myProfile service', async () => {
        const { myProfile } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await myProfile(req, res, next);

        expect(mockMyProfile).toHaveBeenCalledWith(
            req,
            res,
            next
        );
    });

    it('should await myProfile service', async () => {
        const { myProfile } =
            await import('../../src/controllers/userController.js');

        await expect(
            myProfile({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    // =========================
    // getUserProfile
    // =========================

    it('should call getUserProfile service', async () => {
        const { getUserProfile } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await getUserProfile(req, res, next);

        expect(mockGetUserProfile).toHaveBeenCalledWith(
            req,
            res,
            next
        );
    });

    it('should await getUserProfile service', async () => {
        const { getUserProfile } =
            await import('../../src/controllers/userController.js');

        await expect(
            getUserProfile({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    // =========================
    // updateUserProfile
    // =========================

    it('should call updateUserProfile service', async () => {
        const { updateUserProfile } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await updateUserProfile(req, res, next);

        expect(mockUpdateUserProfile).toHaveBeenCalledWith(
            req,
            res,
            next
        );
    });

    it('should await updateUserProfile service', async () => {
        const { updateUserProfile } =
            await import('../../src/controllers/userController.js');

        await expect(
            updateUserProfile({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    // =========================
    // updateProfilePic
    // =========================

    it('should call updateProfilePic service', async () => {
        const { updateProfilePic } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await updateProfilePic(req, res, next);

        expect(mockUpdateProfilePic).toHaveBeenCalledWith(
            req,
            res,
            next
        );
    });

    it('should await updateProfilePic service', async () => {
        const { updateProfilePic } =
            await import('../../src/controllers/userController.js');

        await expect(
            updateProfilePic({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    // =========================
    // updateResume
    // =========================

    it('should call updateResume service', async () => {
        const { updateResume } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await updateResume(req, res, next);

        expect(mockUpdateResume).toHaveBeenCalledWith(
            req,
            res,
            next
        );
    });

    it('should await updateResume service', async () => {
        const { updateResume } =
            await import('../../src/controllers/userController.js');

        await expect(
            updateResume({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    // =========================
    // addSkills
    // =========================

    it('should call addSkills service', async () => {
        const { addSkills } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await addSkills(req, res, next);

        expect(mockAddSkills).toHaveBeenCalledWith(
            req,
            res,
            next
        );
    });

    it('should await addSkills service', async () => {
        const { addSkills } =
            await import('../../src/controllers/userController.js');

        await expect(
            addSkills({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    // =========================
    // deleteSkills
    // =========================

    it('should call deleteSkills service', async () => {
        const { deleteSkills } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await deleteSkills(req, res, next);

        expect(mockDeleteSkills).toHaveBeenCalledWith(
            req,
            res,
            next
        );
    });

    it('should await deleteSkills service', async () => {
        const { deleteSkills } =
            await import('../../src/controllers/userController.js');

        await expect(
            deleteSkills({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    // =========================
    // rejection propagation
    // =========================

    it('should propagate myProfile errors', async () => {
        mockMyProfile.mockRejectedValue(
            new Error('Profile failed')
        );

        const { myProfile } =
            await import('../../src/controllers/userController.js');

        await expect(
            myProfile({}, {}, jest.fn())
        ).rejects.toThrow(
            'Profile failed'
        );
    });

    it('should propagate getUserProfile errors', async () => {
        mockGetUserProfile.mockRejectedValue(
            new Error('Get failed')
        );

        const { getUserProfile } =
            await import('../../src/controllers/userController.js');

        await expect(
            getUserProfile({}, {}, jest.fn())
        ).rejects.toThrow(
            'Get failed'
        );
    });

    it('should propagate updateUserProfile errors', async () => {
        mockUpdateUserProfile.mockRejectedValue(
            new Error('Update failed')
        );

        const { updateUserProfile } =
            await import('../../src/controllers/userController.js');

        await expect(
            updateUserProfile({}, {}, jest.fn())
        ).rejects.toThrow(
            'Update failed'
        );
    });

    it('should propagate updateProfilePic errors', async () => {
        mockUpdateProfilePic.mockRejectedValue(
            new Error('Pic failed')
        );

        const { updateProfilePic } =
            await import('../../src/controllers/userController.js');

        await expect(
            updateProfilePic({}, {}, jest.fn())
        ).rejects.toThrow(
            'Pic failed'
        );
    });

    it('should propagate updateResume errors', async () => {
        mockUpdateResume.mockRejectedValue(
            new Error('Resume failed')
        );

        const { updateResume } =
            await import('../../src/controllers/userController.js');

        await expect(
            updateResume({}, {}, jest.fn())
        ).rejects.toThrow(
            'Resume failed'
        );
    });

    it('should propagate addSkills errors', async () => {
        mockAddSkills.mockRejectedValue(
            new Error('Skill failed')
        );

        const { addSkills } =
            await import('../../src/controllers/userController.js');

        await expect(
            addSkills({}, {}, jest.fn())
        ).rejects.toThrow(
            'Skill failed'
        );
    });

    it('should propagate deleteSkills errors', async () => {
        mockDeleteSkills.mockRejectedValue(
            new Error('Delete failed')
        );

        const { deleteSkills } =
            await import('../../src/controllers/userController.js');

        await expect(
            deleteSkills({}, {}, jest.fn())
        ).rejects.toThrow(
            'Delete failed'
        );
    });

    // =========================
    // applyForJobs
    // =========================

    it('should call applyForJobs service', async () => {
        const { applyForJobs } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await applyForJobs(req, res, next);

        expect(mockApplyForJobs).toHaveBeenCalledWith(req, res, next);
    });

    it('should await applyForJobs service', async () => {
        const { applyForJobs } =
            await import('../../src/controllers/userController.js');

        await expect(
            applyForJobs({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    it('should propagate applyForJobs errors', async () => {
        mockApplyForJobs.mockRejectedValue(new Error('Apply failed'));

        const { applyForJobs } =
            await import('../../src/controllers/userController.js');

        await expect(
            applyForJobs({}, {}, jest.fn())
        ).rejects.toThrow('Apply failed');
    });

    // =========================
    // getAllApplications
    // =========================

    it('should call getAllApplications service', async () => {
        const { getAllApplications } =
            await import('../../src/controllers/userController.js');

        const req = {};
        const res = {};
        const next = jest.fn();

        await getAllApplications(req, res, next);

        expect(mockGetAllApplications).toHaveBeenCalledWith(req, res, next);
    });

    it('should await getAllApplications service', async () => {
        const { getAllApplications } =
            await import('../../src/controllers/userController.js');

        await expect(
            getAllApplications({}, {}, jest.fn())
        ).resolves.toBeUndefined();
    });

    it('should propagate getAllApplications errors', async () => {
        mockGetAllApplications.mockRejectedValue(new Error('GetAll failed'));

        const { getAllApplications } =
            await import('../../src/controllers/userController.js');

        await expect(
            getAllApplications({}, {}, jest.fn())
        ).rejects.toThrow('GetAll failed');
    });
});