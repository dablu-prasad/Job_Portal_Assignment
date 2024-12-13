import React, { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import "./EditProfilePage.css"; // Add custom CSS styles here
import { useMutation, useQuery } from "@apollo/client";
import { USER_QUERY } from "../../Graphql/querys";
import { getAuthHeaders } from "../../Authenticates/isAuthenticated";
import { EDIT_PROFILE } from "../../Graphql/mutations";
import { useNavigate } from "react-router-dom";
import { EditFormError, FormError } from "../../types/types";
import ErrorPopupPage from "../ErrorPopupPage/ErrorPopupPage";
import SuccessPopupPage from "../SuccessPopupPage/SuccessPopupPage";

interface EditProfilePageProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({
    isOpen,
    onClose,
}) => {
    const { data, refetch } = useQuery(USER_QUERY, getAuthHeaders())
    const [editUser, { loading }] = useMutation(EDIT_PROFILE)
    const [formError, setFormError] = useState<EditFormError>({});
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: data?.userDetails.username || "",
        firstname: data?.userDetails.firstname || "",
        lastname: data?.userDetails.lastname || "",
        email: data?.userDetails.email || "",
        mobile: data?.userDetails.mobile || "",
        description: data?.userDetails.description || "",
        image: data?.userDetails.image || "",
        imagePreview: "avatar.png"//user.imagePreview
    });
    useEffect(() => {
        setFormData({
            username: data?.userDetails.username || "",
            firstname: data?.userDetails.firstname || "",
            lastname: data?.userDetails.lastname || "",
            email: data?.userDetails.email || "",
            mobile: data?.userDetails.mobile || "",
            description: data?.userDetails.description || "",
            image: data?.userDetails.image || "",
            imagePreview: "avatar.png"//user.imagePreview
        })
    }, [data])
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: any) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };
    const closeErrorPopup = () => {
        setErrorMessage("");
    };
    const closeSuccessPopup = () => {
        setSuccessMessage("");
    };
    const validateInput = () => {
        const errorData: any = {};
        if (!formData.username.trim()) {
            errorData.username = "username is required";
        } else if (formData.username.length < 3) {
            errorData.username = "username must be at least 3 characters";
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
            errorData.username = "username can only contain letters and numbers";
        }

        if (!formData.firstname.trim()) {
            errorData.firstname = "First name is required";
        } else if (formData.firstname.length < 2) {
            errorData.firstname = "First name must be at least 2 characters";
        } else if (!/^[a-zA-Z]+$/.test(formData.firstname)) {
            errorData.firstname = "First name can only contain letters";
        }

        if (!formData.lastname.trim()) {
            errorData.lastname = "Last name is required";
        } else if (formData.lastname.length < 2) {
            errorData.lastname = "Last name must be at least 2 characters";
        } else if (!/^[a-zA-Z]+$/.test(formData.lastname)) {
            errorData.lastname = "Last name can only contain letters";
        }

        if (!formData.email.trim()) {
            errorData.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errorData.email = "Email is not valid";
        }
        if (!formData.mobile.trim()) {
            errorData.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            errorData.mobile = "Mobile number must be exactly 10 digits";
        }

        setFormError(errorData);
        return errorData;
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("formData22=====>", formData)
        e.preventDefault();
        const validateError = validateInput();
        if (Object.keys(validateError).length > 0) {
            return;
        }
        try {
            const response = await editUser({
                variables: {
                    userName: formData.username,
                    firstName: formData.firstname,
                    lastName: formData.lastname,
                    email: formData.email,
                    mobile: formData.mobile,
                    description: formData.description
                },
            });
            if (response.data.editUser.success) {
                setSuccessMessage("User profile updated successfully");
                navigate('/dashboard');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || "An unknown error occurred.";
            setErrorMessage(message);
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="edit-user-modal"
        >
            <div className="edit-user-container">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit} className="edit-user-form">
                    <div className="avatar-container">
                        <img
                            src="avatar.png"//{formData.imagePreview}
                            alt="avatar.png"
                            className="avatar-preview"
                        />
                        <h3>Profile Image</h3>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'block' }}
                        />
                    </div>
                    <div className="edit-profile-details">
                        <div className="edit-username">
                            <label>User Name</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            {formError.username && <p className="error-text">{formError.username}</p>}
                        </div>

                        <div className="edit-firstname">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                            
                            {formError.firstname && <p className="error-text">{formError.firstname}</p>}
                        </div>
                        <div className="edit-lastname">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                            
                            {formError.lastname && <p className="error-text">{formError.lastname}</p>}
                        </div>
                        <div className="edit-email">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            
                            {formError.email && <p className="error-text">{formError.email}</p>}
                        </div>
                        <div className="edit-mobile">
                            <label>Mobile</label>
                            <input
                                type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                            
                            {formError.mobile && <p className="error-text">{formError.mobile}</p>}
                        </div>
                        <div className="edit-description">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                            
                            {formError.description && <p className="error-text">{formError.description}</p>}
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="save-button">Update Profile</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                        {errorMessage && <ErrorPopupPage message={errorMessage} onClose={closeErrorPopup} />}
                        {successMessage && <SuccessPopupPage message={successMessage} onClose={closeSuccessPopup} />}
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default EditProfilePage;
