/**
 * Mock API Service
 * Simulates backend operations using localStorage as a persistent JSON store.
 */

const STORAGE_KEYS = {
    INVESTORS: 'ub_investors',
    MANAGEMENT: 'ub_management',
    VOLUNTEERS: 'ub_volunteers',
    IDEAS: 'ub_investment_ideas'
};

// Initialize storages if empty
const initStore = (key) => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
    }
};

Object.values(STORAGE_KEYS).forEach(initStore);

const getFromStore = (key) => JSON.parse(localStorage.getItem(key));
const saveToStore = (key, data) => localStorage.setItem(key, JSON.stringify(data));

export const api = {
    // Investor simulation
    getInvestors: () => getFromStore(STORAGE_KEYS.INVESTORS),
    addInvestor: (investor) => {
        const investors = getFromStore(STORAGE_KEYS.INVESTORS);
        investors.push(investor);
        saveToStore(STORAGE_KEYS.INVESTORS, investors);
        return { success: true };
    },
    authenticateInvestor: (username, password) => {
        const investors = getFromStore(STORAGE_KEYS.INVESTORS);
        const investor = investors.find(u => u.username === username && u.password === password);
        return investor || null;
    },

    // Management simulation
    getManagement: () => getFromStore(STORAGE_KEYS.MANAGEMENT),
    addManagement: (admin) => {
        const management = getFromStore(STORAGE_KEYS.MANAGEMENT);
        management.push(admin);
        saveToStore(STORAGE_KEYS.MANAGEMENT, management);
        return { success: true };
    },
    authenticateManagement: (username, password) => {
        const management = getFromStore(STORAGE_KEYS.MANAGEMENT);
        const admin = management.find(u => u.username === username && u.password === password);
        return admin || null;
    },

    // Volunteers simulation
    getVolunteers: () => getFromStore(STORAGE_KEYS.VOLUNTEERS),
    addVolunteer: (volunteer) => {
        const volunteers = getFromStore(STORAGE_KEYS.VOLUNTEERS);
        volunteers.push({ ...volunteer, id: Date.now() });
        saveToStore(STORAGE_KEYS.VOLUNTEERS, volunteers);
        return { success: true };
    },

    // Investment Ideas simulation
    getInvestmentIdeas: () => getFromStore(STORAGE_KEYS.IDEAS),
    addInvestmentIdea: (idea) => {
        const ideas = getFromStore(STORAGE_KEYS.IDEAS);
        ideas.push({ ...idea, id: Date.now() });
        saveToStore(STORAGE_KEYS.IDEAS, ideas);
        return { success: true };
    }
};
