import { myProfile as profile, 
    getUserProfile as getProfile, 
    updateUserProfile as updateProfile,
    updateProfilePic as updatePic,
    updateResume as updateRes,
    addSkills as addSkill,
    deleteSkills as deleteSkill,
    applyForJobs as applyForJob,
    getAllApplications as getAllApplication
 } from '../services/userService.js'

export const myProfile = async(req: any, res: any, next: any) => {
    await profile(req, res, next);
};

export const getUserProfile = async(req: any, res: any, next: any) => {
    await getProfile(req, res, next);
};

export const updateUserProfile = async(req: any, res: any, next: any) => {
    await updateProfile(req, res, next);
};

export const updateProfilePic = async(req: any, res: any, next: any) => {
    await updatePic(req, res, next);
};

export const updateResume = async(req: any, res: any, next: any) => {
    await updateRes(req, res, next);
};

export const addSkills = async(req: any, res: any, next: any) => {
    await addSkill(req, res, next);
}

export const deleteSkills = async(req: any, res: any, next: any) => {
    await deleteSkill(req, res, next);
}

export const applyForJobs = async(req: any, res: any, next: any) => {
    await applyForJob(req, res, next);
}

export const getAllApplications = async(req: any, res: any, next: any) => {
    await getAllApplication(req, res, next);
}