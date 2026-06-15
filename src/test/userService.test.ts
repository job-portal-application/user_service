// user.service.test.ts

import { jest, describe, beforeEach, expect, it } from '@jest/globals';

const mockSql = jest.fn<any>();
const mockGetBuffer = jest.fn<any>();
const mockAxiosPost = jest.fn<any>();

jest.unstable_mockModule('../../src/utils/db.js', () => ({
    sql: mockSql,
}));

jest.unstable_mockModule('../../src/utils/buffer.js', () => ({
    default: mockGetBuffer,
}));

jest.unstable_mockModule('axios', () => ({
    default: {
        post: mockAxiosPost,
    },
}));

describe('user services', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();

        process.env.UPLOAD_SERVICE_URL =
            'http://localhost:5000';
    });

    // =========================
    // myProfile
    // =========================

    it('should return my profile', async () => {
        const { myProfile } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const req: any = {
            user: {
                user_id: 1,
                name: 'John',
            },
        };

        const res: any = {
            json,
        };

        await myProfile(req, res, jest.fn());

        expect(json).toHaveBeenCalledWith(req.user);
    });

    // =========================
    // getUserProfile
    // =========================

    it('should get user profile successfully', async () => {
        mockSql.mockResolvedValue([
            {
                user_id: 1,
                name: 'John',
                skills: ['Node'],
            },
        ]);

        const { getUserProfile } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const req: any = {
            params: {
                userId: 1,
            },
        };

        const res: any = {
            json,
        };

        await getUserProfile(req, res, jest.fn());

        expect(json).toHaveBeenCalledWith({
            user_id: 1,
            name: 'John',
            skills: ['Node'],
        });
    });

    it('should assign empty skills array', async () => {
        mockSql.mockResolvedValue([
            {
                user_id: 1,
                skills: null,
            },
        ]);

        const { getUserProfile } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const req: any = {
            params: {
                userId: 1,
            },
        };

        const res: any = {
            json,
        };

        await getUserProfile(req, res, jest.fn());

        expect(json).toHaveBeenCalledWith({
            user_id: 1,
            skills: [],
        });
    });

    it('should handle user not found in getUserProfile', async () => {
        mockSql.mockResolvedValue([]);

        const { getUserProfile } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await getUserProfile(
            {
                params: {
                    userId: 1,
                },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(404);
    });

    // =========================
    // updateUserProfile
    // =========================

    it('should update user profile successfully', async () => {
        mockSql.mockResolvedValue([
            {
                user_id: 1,
                name: 'Updated',
            },
        ]);

        const { updateUserProfile } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const req: any = {
            user: {
                user_id: 1,
                name: 'John',
                phone_number: '9999999999',
                bio: 'Developer',
            },
            body: {
                name: 'Updated',
            },
        };

        const res: any = {
            json,
        };

        await updateUserProfile(req, res, jest.fn());

        expect(json).toHaveBeenCalledWith({
            message: 'Profile updated successfully',
            updatedUser: {
                user_id: 1,
                name: 'Updated',
            },
        });
    });

    it('should use existing values in updateUserProfile', async () => {
        mockSql.mockResolvedValue([
            {
                user_id: 1,
            },
        ]);

        const { updateUserProfile } =
            await import('../../src/services/userService.js');

        await updateUserProfile(
            {
                user: {
                    user_id: 1,
                    name: 'John',
                    phone_number: '999',
                    bio: 'Developer',
                },
                body: {},
            } as any,
            {
                json: jest.fn(),
            } as any,
            jest.fn()
        );

        expect(mockSql).toHaveBeenCalled();
    });

    it('should reject unauthorized updateUserProfile', async () => {
        const { updateUserProfile } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await updateUserProfile(
            {
                user: undefined,
                body: {},
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(401);
    });

    // =========================
    // updateProfilePic
    // =========================

    it('should update profile picture successfully', async () => {
        mockGetBuffer.mockReturnValue({
            content: 'buffer-data',
        });

        mockAxiosPost.mockResolvedValue({
            data: {
                url: 'profile.jpg',
                public_id: 'public-id',
            },
        });

        mockSql.mockResolvedValue([
            {
                user_id: 1,
                profile_pic: 'profile.jpg',
            },
        ]);

        const { updateProfilePic } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const req: any = {
            user: {
                user_id: 1,
                profile_pic_public_id: 'old-id',
            },
            file: {
                originalname: 'image.png',
            },
        };

        const res: any = {
            json,
        };

        await updateProfilePic(req, res, jest.fn());

        expect(mockAxiosPost).toHaveBeenCalled();

        expect(json).toHaveBeenCalledWith({
            message:
                'Profile picture updated successfully',
            updatedUser: {
                user_id: 1,
                profile_pic: 'profile.jpg',
            },
        });
    });

    it('should reject missing profile picture file', async () => {
        const { updateProfilePic } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await updateProfilePic(
            {
                user: {
                    user_id: 1,
                },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(400);
    });

    it('should reject invalid profile picture buffer', async () => {
        mockGetBuffer.mockReturnValue(null);

        const { updateProfilePic } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await updateProfilePic(
            {
                user: {
                    user_id: 1,
                },
                file: {},
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(400);
    });

    // =========================
    // updateResume
    // =========================

    it('should update resume successfully', async () => {
        mockGetBuffer.mockReturnValue({
            content: 'resume-buffer',
        });

        mockAxiosPost.mockResolvedValue({
            data: {
                url: 'resume.pdf',
                public_id: 'resume-id',
            },
        });

        mockSql.mockResolvedValue([
            {
                user_id: 1,
                resume: 'resume.pdf',
            },
        ]);

        const { updateResume } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const req: any = {
            user: {
                user_id: 1,
                resume_public_id: 'old-id',
            },
            file: {
                originalname: 'resume.pdf',
            },
        };

        const res: any = {
            json,
        };

        await updateResume(req, res, jest.fn());

        expect(json).toHaveBeenCalledWith({
            message: 'Resume updated successfully',
            updatedUser: {
                user_id: 1,
                resume: 'resume.pdf',
            },
        });
    });

    it('should reject missing resume file', async () => {
        const { updateResume } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await updateResume(
            {
                user: {
                    user_id: 1,
                },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(400);
    });

    // =========================
    // addSkills
    // =========================

    it('should add skill successfully', async () => {
        mockSql
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce([
                {
                    user_id: 1,
                },
            ])
            .mockResolvedValueOnce([
                {
                    skill_id: 1,
                },
            ])
            .mockResolvedValueOnce([
                {
                    user_id: 1,
                },
            ])
            .mockResolvedValueOnce(undefined);

        const { addSkills } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const req: any = {
            user: {
                user_id: 1,
            },
            body: {
                skillName: 'Node.js',
            },
        };

        const res: any = {
            json,
        };

        await addSkills(req, res, jest.fn());

        expect(json).toHaveBeenCalledWith({
            message: 'Node.js is added successfully',
        });
    });

    it('should reject empty skill name', async () => {
        const { addSkills } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await addSkills(
            {
                body: {
                    skillName: '',
                },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(400);
    });

    it('should handle already existing skill', async () => {
        mockSql
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce([
                {
                    user_id: 1,
                },
            ])
            .mockResolvedValueOnce([
                {
                    skill_id: 1,
                },
            ])
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce(undefined);

        const { addSkills } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const status = jest.fn(() => ({
            json,
        }));

        const res: any = {
            status,
            json,
        };

        await addSkills(
            {
                user: {
                    user_id: 1,
                },
                body: {
                    skillName: 'Node.js',
                },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(200);
    });

    it('should reject unauthenticated updateProfilePic', async () => {
        const { updateProfilePic } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({ json: jest.fn() }));
        const res: any = { status };

        await updateProfilePic(
            { user: undefined, file: {} } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(401);
    });

    it('should reject unauthenticated updateResume', async () => {
        const { updateResume } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({ json: jest.fn() }));
        const res: any = { status };

        await updateResume(
            { user: undefined } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(401);
    });

    it('should reject invalid resume buffer', async () => {
        mockGetBuffer.mockReturnValue(null);

        const { updateResume } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({ json: jest.fn() }));
        const res: any = { status };

        await updateResume(
            {
                user: { user_id: 1, resume_public_id: 'old-id' },
                file: { originalname: 'resume.pdf' },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(500);
    });

    it('should throw 404 when user not found in addSkills', async () => {
        mockSql
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce(undefined);

        const { addSkills } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({ json: jest.fn() }));
        const res: any = { status };

        await addSkills(
            {
                user: { user_id: 1 },
                body: { skillName: 'Node.js' },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(404);
    });

    it('should throw 500 when skill insert returns nothing in addSkills', async () => {
        mockSql
            .mockResolvedValueOnce(undefined)
            .mockResolvedValueOnce([{ user_id: 1 }])
            .mockResolvedValueOnce([])
            .mockResolvedValueOnce(undefined);

        const { addSkills } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({ json: jest.fn() }));
        const res: any = { status };

        await addSkills(
            {
                user: { user_id: 1 },
                body: { skillName: 'Node.js' },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(500);
    });

    it('should rollback transaction on addSkills failure', async () => {
        mockSql
            .mockResolvedValueOnce(undefined)
            .mockRejectedValueOnce(
                new Error('DB failed')
            )
            .mockResolvedValueOnce(undefined);

        const { addSkills } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await addSkills(
            {
                user: {
                    user_id: 1,
                },
                body: {
                    skillName: 'Node.js',
                },
            } as any,
            res,
            jest.fn()
        );

        expect(mockSql).toHaveBeenCalled();
    });

    // =========================
    // deleteSkills
    // =========================

    it('should delete skill successfully', async () => {
        mockSql.mockResolvedValue([
            {
                user_id: 1,
            },
        ]);

        const { deleteSkills } =
            await import('../../src/services/userService.js');

        const json = jest.fn();

        const req: any = {
            user: {
                user_id: 1,
            },
            body: {
                skillName: 'Node.js',
            },
        };

        const res: any = {
            json,
        };

        await deleteSkills(req, res, jest.fn());

        expect(json).toHaveBeenCalledWith({
            message:
                'Node.js is deleted successfully',
        });
    });

    it('should reject unauthenticated deleteSkills', async () => {
        const { deleteSkills } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await deleteSkills(
            {
                user: undefined,
                body: {
                    skillName: 'Node.js',
                },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(401);
    });

    it('should reject empty skill in deleteSkills', async () => {
        const { deleteSkills } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await deleteSkills(
            {
                user: {
                    user_id: 1,
                },
                body: {
                    skillName: '',
                },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(400);
    });

    it('should return not found in deleteSkills', async () => {
        mockSql.mockResolvedValue([]);

        const { deleteSkills } =
            await import('../../src/services/userService.js');

        const status = jest.fn(() => ({
            json: jest.fn(),
        }));

        const res: any = {
            status,
        };

        await deleteSkills(
            {
                user: {
                    user_id: 1,
                },
                body: {
                    skillName: 'Node.js',
                },
            } as any,
            res,
            jest.fn()
        );

        expect(status as any).toHaveBeenCalledWith(404);
    });
});