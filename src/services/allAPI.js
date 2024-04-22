import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

// register api called by component auth
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// login api called by component auth
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

// add project
export const addProjectAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/add-project`, reqBody, reqHeader)
}

// get all project

export const getAllProjectsAPI = async (seacrchKey, reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/all-projects?search=${seacrchKey}`, "", reqHeader)
}

// user project
export const getUserProjectsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/user-projects`, "", reqHeader)
}

// home projects
export const getHomeProjectsAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/home-projects`, "")
}

// edit project
export const editProjectAPI = async (projectId, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/edit-project/${projectId}`, reqBody, reqHeader)
}

// remove project
export const removeProjectAPI = async (projectId, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/remove-project/${projectId}`, {}, reqHeader)
}
// updateUser 
export const upadateUserAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/edit-user`,reqBody, reqHeader)
}

