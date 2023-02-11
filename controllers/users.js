import User from "../models/User.js";
import Application from "../models/Application.js";
import Document from "../models/Document.js";
import * as fs from "fs";

/* READ */

export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const getUserApplications = async (req, res) => {
    try {
        const {id} = req.params;
        const application = await Application.find({userId: id});
        res.status(200).json(application);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const getUserApplication = async (req, res) => {
    try {
        const {id, applicationId} = req.params;
        const application = await Application.findById(applicationId);
        res.status(200).json(application);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const getApplicationDocuments = async (req, res) => {
    try {
        const {id, applicationId} = req.params;
        const document = await Document.find({applicationId: applicationId});
        res.status(200).json(document);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const getApplicationDocument = async (req, res) => {
    try {
        const {id, applicationId, documentId} = req.params;
        const document = await Document.findById(documentId);
        res.status(200).json(document);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};


/* UPDATE */

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {firstName, lastName, emailAddress, universityName, universityYear} = req.body;
        const user = await User.findById(id);
        user.firstName = firstName;
        user.lastName = lastName;
        user.emailAddress = emailAddress;
        user.universityName = universityName;
        user.universityYear = universityYear;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const updateUserApplication = async (req, res) => {
    try {
        const {id, applicationId} = req.params;
        const {
            companyName,
            jobTitle,
            applicationDeadline,
            jobDescription,
            jobNote,
            jobApplied,
            interviewCall,
            assessment,
            interviewFinal,
            jobOffer
        } = req.body;
        const application = await Application.findById(applicationId);
        application.companyName = companyName;
        application.jobTitle = jobTitle;
        application.applicationDeadline = applicationDeadline;
        application.jobDescription = jobDescription;
        application.jobNote = jobNote;
        application.jobApplied = jobApplied;
        application.interviewCall = interviewCall;
        application.assessment = assessment;
        application.interviewFinal = interviewFinal;
        application.jobOffer = jobOffer;
        await application.save();
        res.status(200).json(application);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const updateApplicationDocument = async (req, res) => {
    try {
        const {id, applicationId, documentId} = req.params;
        const {documentTitle, documentFilePath} = req.body;
        const document = await Document.findById(documentId);

        document.documentTitle = documentTitle;
        document.documentFilePath = documentFilePath;

        await document.save();
        res.status(200).json(document);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

/* CREATE */

export const addUserApplication = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            companyName,
            jobTitle,
            applicationDeadline,
            jobDescription,
            jobNote,
            jobApplied,
            interviewCall,
            assessment,
            interviewFinal,
            jobOffer
        } = req.body;
        const newApplication = new Application({
            userId: id,
            companyName: companyName,
            jobTitle: jobTitle,
            applicationDeadline: applicationDeadline,
            jobDescription: jobDescription,
            jobNote: jobNote,
            jobApplied: jobApplied,
            interviewCall: interviewCall,
            assessment: assessment,
            interviewFinal: interviewFinal,
            jobOffer: jobOffer
        });

        await newApplication.save();

        const application = await Application.find();
        res.status(201).json(application);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const addApplicationDocument = async (req, res) => {
    try {
        const {id, applicationId} = req.params;
        const file = req.file;

        if (!file) {
            return res.status(400).json({message: "Please upload a file"});
        }
        const newDocument = new Document({
            applicationId: applicationId,
            documentTitle: file.originalname,
            documentFilePath: file.path
        });

        await newDocument.save();
        const document = await Document.find();
        res.status(201).json(document);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};


/* DELETE */

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({message: 'User not found'});
        } else {
            res.status(200).json({message: 'User deleted'});
        }
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const deleteUserApplication = async (req, res) => {
    try {
        const {id, applicationId} = req.params;
        const application = await Application.findByIdAndDelete(applicationId);
        if (!application) {
            res.status(404).json({message: 'Application not found'});
        } else {
            res.status(200).json({message: 'Application deleted'});
        }
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};

export const deleteApplicationDocument = async (req, res) => {
    try {
        const {id, applicationId, documentId} = req.params;
        const document = await Document.findByIdAndDelete(documentId);
        if (!document) {
            res.status(404).json({message: 'Document not found'});
        } else {
            res.status(200).json({message: 'Document deleted'});
        }

        fs.unlink(document.documentFilePath, (err) => {
            if (err) {
                return res.status(500).json({message: "Error deleting file"});
            }
            document.remove();
            res.status(200).json({message: "Document deleted successfully"});
        });
    } catch (err) {
        res.status(404).json({message: err.message});
    }
};






