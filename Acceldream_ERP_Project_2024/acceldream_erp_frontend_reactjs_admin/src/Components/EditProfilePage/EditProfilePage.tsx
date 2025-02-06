import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./EditProfilePage.css";
import { useMutation, useQuery } from "@apollo/client";
import { USER_QUERY } from "../../Graphql/querys";
import { EDIT_PROFILE } from "../../Graphql/mutations";
import { useNavigate } from "react-router-dom";
import { EditFormError } from "../../types/types";
import ErrorPopupPage from "../ErrorPopupPage/ErrorPopupPage";
import SuccessPopupPage from "../SuccessPopupPage/SuccessPopupPage";
import { getAuthHeaders } from "../../Authenticates/isAuthenticated";

interface EditProfilePageProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ isOpen, onClose }) => {
    const { data, refetch } = useQuery(USER_QUERY, getAuthHeaders());
    const [editUser, { loading }] = useMutation(EDIT_PROFILE,getAuthHeaders());

    const [formError, setFormError] = useState<EditFormError>({});
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");


    const [formData, setFormData] = useState<{
        _id: string;
        userName: string;
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        description: string;
        image: string | File;
        imagePreview: string;
    }>({
        _id: "",
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        description: "",
        image: "",
        imagePreview: "avatar.png",
    });

    useEffect(() => {
        if (data?.userDetails) {
            setFormData({
                _id: data.userDetails._id || "",
                userName: data.userDetails.userName || "",
                firstName: data.userDetails.firstName || "",
                lastName: data.userDetails.lastName || "",
                email: data.userDetails.email || "",
                mobile: data.userDetails.mobile || "",
                description: data.userDetails.description || "",
                image: "",
                imagePreview: data.userDetails.image
                    ? `${process.env.REACT_APP_IMAGE_PATH}${data.userDetails.image}`
                    : "avatar.png",
            });
        }
    }, [data]);

    useEffect(() => {
        return () => {
            if (formData.imagePreview && formData.image instanceof File) {
                URL.revokeObjectURL(formData.imagePreview);
            }
        };
    }, [formData.imagePreview, formData.image]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }));
        }
    };

    const validateInput = () => {
        const errors: EditFormError = {};

        if (!formData.userName.trim()) {
            errors.userName = "User name is required.";
        } else if (formData.userName.length < 3) {
            errors.userName = "User name must be at least 3 characters.";
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.userName)) {
            errors.userName = "User name can only contain letters and numbers.";
        }

        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required.";
        } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
            errors.firstName = "First name can only contain letters.";
        }

        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required.";
        } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
            errors.lastName = "Last name can only contain letters.";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Email is not valid.";
        }

        if (!formData.mobile.trim()) {
            errors.mobile = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            errors.mobile = "Mobile number must be exactly 10 digits.";
        }

        setFormError(errors);
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateInput();
        if (Object.keys(errors).length > 0) return;

        try {
            const response = await editUser({
                variables: {
                    ID: formData._id,
                    userName: formData.userName,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    mobile: formData.mobile,
                    description: formData.description,
                    image: formData.image instanceof File ? formData.image : "",// GraphQL handles uploads
                },
            });

            if (response.data.editUser.success) {
                setSuccessMessage("Profile updated successfully.");
                refetch();
            }
        } catch (error: any) {
            setErrorMessage(error.message || "An unknown error occurred.");
        }

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="edit-user-modal">
            <div className="edit-user-container">
                <div className="edit-user-container-h2">
                <h2>Edit Profile</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="edit-user-form">
                    <div className="avatar-container">
                        <img
                            src={formData.imagePreview || "avatar.png"}
                            alt="Profile Preview"
                            className="avatar-preview"
                        />
                        <h3>Profile Image</h3>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="edit-profile-details">
                        {["userName", "firstName", "lastName", "email", "mobile"].map((field) => (
                            <div key={field} className={`edit-${field.toLowerCase()}`}>
                                <label>{field.replace(/([A-Z])/g, " $1").trim()}</label>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    name={field}
                                    value={formData[field as keyof typeof formData] as string}
                                    onChange={handleChange}
                                    required
                                />
                                {formError[field as keyof EditFormError] && (
                                    <p className="error-text">
                                        {formError[field as keyof EditFormError]}
                                    </p>
                                )}
                            </div>
                        ))}
                        <div className="edit-description">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="save-button">
                            {loading ? "Loading..." : "Update Profile"}
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                        {errorMessage && (
                        <ErrorPopupPage message={errorMessage} onClose={() => setErrorMessage("")} />
                    )}
                    {successMessage && (
                        <SuccessPopupPage
                            message={successMessage}
                            onClose={() => setSuccessMessage("")}
                        />
                    )}
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EditProfilePage;
