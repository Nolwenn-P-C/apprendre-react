import { accountService } from "./account.service";
import baseURL from "./caller.service"


let getAllUsers = async () => {
    try {
        const response = await fetch (baseURL+"/users/")

        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs")
            const apiResponsegetAllUsers = await response.json();
        return apiResponsegetAllUsers
    } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs :", err)
        throw err
    }
}

let getUser = async (uid) => {
    try {
        const headers = new Headers();
        if (accountService.isLogged()) {
            headers.append('Authorization', 'Bearer ' + accountService.getToken());
        }

        const response = await fetch(baseURL + "/users/" + uid, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération de l'utilisateur avec l'ID ${uid}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Erreur lors de la récupération de l'utilisateur :", err);
        throw err;
    }
};


let updateUser = async (uid, user) => {
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json'); 

        if (accountService.isLogged()) {
            headers.append('Authorization', 'Bearer ' + accountService.getToken());
        }

        const response = await fetch(baseURL + "/users/" + uid, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(user) 
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour de l'utilisateur avec l'ID ${uid}`);
        }

        return await response.json(); 
    } catch (err) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", err);
        throw err; 
    }
};

let deleteUser = async (uid) => {
    try {
        const response = await fetch(baseURL + `/users/` + uid, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression de l'utilisateur avec l'ID ${uid}`);
        }

        console.log(`Utilisateur avec l'ID ${uid} supprimé avec succès.`);
        return response;
    } catch (err) {
        console.error("Erreur lors de la suppression de l'utilisateur :", err);
        throw err;
    }
};

let addUser = async (user) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json"); // Indiquer que les données sont en JSON

        // Ajouter le token si nécessaire
        if (accountService.isLogged()) {
            headers.append("Authorization", "Bearer " + accountService.getToken());
        }

        const response = await fetch(baseURL + `/users/`, {
            method: "PUT", // Garder PUT comme indiqué dans Swagger
            headers: headers,
            body: JSON.stringify(user), // Envoyer les données utilisateur
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout de l'utilisateur : ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Ajout de l'utilisateur avec succès :", data);
        return data;
    } catch (err) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", err);
        throw err;
    }
};


export const userService={
    getAllUsers, getUser, updateUser, deleteUser, addUser
}