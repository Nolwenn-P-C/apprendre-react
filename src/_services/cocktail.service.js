import baseURL from "./caller.service";
import { accountService } from "./account.service";

/**
 * Récupération de la liste des cocktails
 */
let getAllCocktails = async () => {
    try {
        const response = await fetch(baseURL + "/cocktails/");
        if (!response.ok) throw new Error("Erreur lors de la récupération des cocktails");

        const apiResponsegetAllCocktails = await response.json();
        return apiResponsegetAllCocktails;
    } catch (err) {
        console.error("Erreur lors de la récupération des cocktails :", err);
        throw err;
    }
};

/**
 * Récupération d'un cocktail spécifique
 * @param {number} cid
 */
let getCocktail = async (cid) => {
    try {
        const headers = new Headers();
        if (accountService.isLogged()) {
            headers.append("Authorization", "Bearer " + accountService.getToken());
        }

        const response = await fetch(baseURL + "/cocktails/" + cid, {
            method: "GET",
            headers: headers,
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération du cocktail avec l'ID ${cid}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Erreur lors de la récupération du cocktail :", err);
        throw err;
    }
};

/**
 * Ajout d'un cocktail
 * @param {object} cocktail
 */
let addCocktail = async (cocktail) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        if (accountService.isLogged()) {
            headers.append("Authorization", "Bearer " + accountService.getToken());
        }

        const response = await fetch(baseURL + "/cocktails/", {
            method: "PUT", // Comme indiqué
            headers: headers,
            body: JSON.stringify(cocktail),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de l'ajout du cocktail : ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Ajout du cocktail avec succès :", data);
        return data;
    } catch (err) {
        console.error("Erreur lors de l'ajout du cocktail :", err);
        throw err;
    }
};

/**
 * Mise à jour d'un cocktail
 * @param {number} cid
 * @param {object} cocktail
 */
let updateCocktail = async (cid, cocktail) => {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        if (accountService.isLogged()) {
            headers.append("Authorization", "Bearer " + accountService.getToken());
        }

        const response = await fetch(baseURL + "/cocktails/" + cid, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(cocktail),
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la mise à jour du cocktail avec l'ID ${cid}`);
        }

        return await response.json();
    } catch (err) {
        console.error("Erreur lors de la mise à jour du cocktail :", err);
        throw err;
    }
};

/**
 * Suppression d'un cocktail
 * @param {number} cid
 */
let deleteCocktail = async (cid) => {
    try {
        const response = await fetch(baseURL + "/cocktails/" + cid, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la suppression du cocktail avec l'ID ${cid}`);
        }

        console.log(`Cocktail avec l'ID ${cid} supprimé avec succès.`);
        return response;
    } catch (err) {
        console.error("Erreur lors de la suppression du cocktail :", err);
        throw err;
    }
};

// Export des services
export const cocktailService = {
    getAllCocktails,
    getCocktail,
    addCocktail,
    updateCocktail,
    deleteCocktail,
};
