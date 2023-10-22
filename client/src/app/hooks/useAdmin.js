import React, {useState} from "react";
import RoomService from "../services/RoomService";
import UserService from "../services/UserService";
import LevelService from "../services/LevelService";
import QrhashService from "../services/QrhashService";

export default function useAdmin() {

    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([]);
    const [levels, setLevels] = useState([]);
    const [qrHash, setQrHash] = useState(null);

    async function getUsers() {
        setIsLoading(true)
        try {
            const response = await UserService.getUsers()
            setUsers(response.data)
        } catch (e) {
            console.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }

    }

    async function getLevels() {
        setIsLoading(true)
        try {
            const response = await LevelService.getLevels()
            setLevels(response.data)
        } catch (e) {
            console.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }

    }

    async function createLevel({name, description, min_points, level_score}) {
        setIsLoading(true)
        try {
            const response = await LevelService.createLevel(name,description,parseInt(min_points),parseInt(level_score))

            return response.data
        } catch (e) {
            console.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function createQrhash(roomHash) {
        setIsLoading(true)
        try {
            const response = await QrhashService.createQrhash(roomHash)

            setQrHash(response.data)
        } catch (e) {
            console.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function getQrhash(roomHash) {
        setIsLoading(true)
        try {
            const response = await QrhashService.getQrhash(roomHash)
            setQrHash(response.data)
        } catch (e) {
            console.error(e);
            // setError(e.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return ({
        users,
        getUsers,
        isLoading,
        levels,
        getLevels,
        createLevel,
        getQrhash,
        createQrhash,
        qrHash,
    })
}