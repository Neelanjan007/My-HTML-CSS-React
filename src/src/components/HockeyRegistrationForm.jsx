// HockeyRegistrationForm.jsx
// Formik + Yup + Bootstrap form with:
// • Inline validation
// • Conditional fields/validation
// • FieldArray (Past Teams) up to 3
// • Submit disabled until valid
// • Console log + rows appended to a table after successful submit

import React, { useMemo, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

// --- Helpers ---------------------------------------------------------------

// Compute age from a yyyy-mm-dd string
const getAge = (dobStr) => {
    if (!dobStr) return undefined;
    const today = new Date();
    const dob = new Date(dobStr);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
};

// --- Validation Schema (Yup) ----------------------------------------------
const schema = Yup.object({
    // Player Details
    playerName: Yup.string()
        .required("Player name is required")
        .matches(/^[A-Za-z ]+$/, "Only alphabets and spaces")
        .min(3, "Min 3 characters")
        .max(40, "Max 40 characters"),

    jerseyNumber: Yup.number()
        .typeError("Jersey number must be a number")
        .integer("Must be an integer")
        .min(1, "Min 1")
        .max(99, "Max 99")
        .required("Jersey number is required"),

    position: Yup.mixed()
        .oneOf(["Forward", "Defense", "Goalie"], "Invalid position")
        .required("Position is required"),

    stickHand: Yup.mixed()
        .oneOf(["Left", "Right"], "Invalid stick hand")
        .required("Stick hand is required"),

    dateOfBirth: Yup.string()
        .required("Date of birth is required")
        .test("age-range", "Age must be between 10 and 55", (value) => {
            const age = getAge(value);
            return typeof age === "number" && age >= 10 && age <= 55;
        }),

    nationality: Yup.string().required("Nationality is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Phone must be 10 digits (starts 6-9)")
        .required("Phone is required"),

    playerId: Yup.string()
        .matches(/^HOCK-\d{4}$/, "Format: HOCK-XXXX")
        .required("Player ID is required"),

    guardianName: Yup.string().when("dateOfBirth", (dob, s) => {
        const age = getAge(dob);
        return typeof age === "number" && age < 18
            ? s.required("Guardian name is required")
            : s.notRequired();
    }),

    // Team & Event
    teamName: Yup.string().required("Team name is required"),

    leagueLevel: Yup.mixed()
        .oneOf(["Amateur", "College", "Pro"], "Invalid league level")
        .required("League level is required"),

    tournamentName: Yup.string().required("Tournament name is required"),

    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string()
        .required("End date is required")
        .test(
            "end-after-start",
            "End date must be on or after Start date",
            function (value) {
                const { startDate } = this.parent;
                if (!startDate || !value) return false;
                return new Date(value) >= new Date(startDate);
            }
        ),

    jerseySize: Yup.string().when("position", (pos, s) => {
        return pos !== "Goalie"
            ? s.required("Jersey size is required").oneOf(["S", "M", "L", "XL"])
            : s.notRequired();
    }),

    padSize: Yup.string().when("position", (pos, s) => {
        return pos === "Goalie"
            ? s.required("Pad size is required").oneOf(["S", "M", "L", "XL"])
            : s.notRequired();
    }),

    // Medical & Consent
    hasMedicalCondition: Yup.boolean(),
    medicalCertNumber: Yup.string().when("hasMedicalCondition", (has, s) => {
        return has
            ? s
                .required("Medical certificate number required")
                .matches(/^MED-\d{4}$/, "Format: MED-XXXX")
            : s.notRequired();
    }),
    consent: Yup.boolean().oneOf([true], "Consent is required"),

    // Past Teams - up to 3
    pastTeams: Yup.array()
        .of(
            Yup.object({
                clubName: Yup.string()
                    .required("Club name is required")
                    .min(2, "Min 2")
                    .max(30, "Max 30"),
                years: Yup.number()
                    .typeError("Years must be a number")
                    .integer("Must be an integer")
                    .min(1, "Min 1")
                    .max(20, "Max 20")
                    .required("Years is required"),
            })
        )
        .max(3, "You can add up to 3 past teams"),
});

// --- Component -------------------------------------------------------------
export default function HockeyRegistrationForm() {
    // Table records state (to show submissions)
    const [records, setRecords] = useState([]);

    // Initial values kept memoized to avoid re-renders
    const initialValues = useMemo(
        () => ({
            // Player details
            playerName: "",
            jerseyNumber: "",
            position: "",
            stickHand: "",
            dateOfBirth: "",
            nationality: "",
            email: "",
            phone: "",
            playerId: "",
            guardianName: "",

            // Team & Event
            teamName: "",
            leagueLevel: "",
            tournamentName: "",
            startDate: "",
            endDate: "",
            jerseySize: "",
            padSize: "",

            // Medical & Consent
            hasMedicalCondition: false,
            medicalCertNumber: "",
            consent: false,

            // Past Teams
            pastTeams: [],
        }),
        []
    );

    // Submit handler
    const handleSubmit = (values, actions) => {
        console.log("✅ Submitted payload:", values); // requirement: log data
        setRecords((prev) => [...prev, values]); // add to table
        actions.resetForm(); // reset after successful submit
    };

    return (
        <>
            <h2 className="mb-4 text-center">
                Hockey Tournament Registration (Formik + Yup + Bootstrap)
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
                validateOnMount // ✅ makes Submit disabled initially until valid
            >
                {({ values, isValid, isSubmitting }) => {
                    const age = getAge(values.dateOfBirth);
                    return (
                        <Form noValidate>
                            {/* ---------------- Player Details ---------------- */}
                            <h4 className="mt-3">Player Details</h4>
                            <div className="row g-3">
                                {/* Player Name */}
                                <div className="col-md-6">
                                    <label className="form-label">Player Name</label>
                                    <Field name="playerName" className="form-control" />
                                    <ErrorMessage
                                        name="playerName"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Jersey Number */}
                                <div className="col-md-6">
                                    <label className="form-label">Jersey Number</label>
                                    <Field name="jerseyNumber" className="form-control" />
                                    <ErrorMessage
                                        name="jerseyNumber"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Position */}
                                <div className="col-md-6">
                                    <label className="form-label">Position</label>
                                    <Field as="select" name="position" className="form-select">
                                        <option value="">Select...</option>
                                        <option>Forward</option>
                                        <option>Defense</option>
                                        <option>Goalie</option>
                                    </Field>
                                    <ErrorMessage
                                        name="position"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Stick Hand */}
                                <div className="col-md-6">
                                    <label className="form-label">Stick Hand</label>
                                    <Field as="select" name="stickHand" className="form-select">
                                        <option value="">Select...</option>
                                        <option>Left</option>
                                        <option>Right</option>
                                    </Field>
                                    <ErrorMessage
                                        name="stickHand"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* DOB */}
                                <div className="col-md-6">
                                    <label className="form-label">Date of Birth</label>
                                    <Field
                                        type="date"
                                        name="dateOfBirth"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="dateOfBirth"
                                        component="div"
                                        className="text-danger"
                                    />
                                    {typeof age === "number" && (
                                        <div className="form-text">Age: {age}</div>
                                    )}
                                </div>

                                {/* Nationality */}
                                <div className="col-md-6">
                                    <label className="form-label">Nationality</label>
                                    <Field name="nationality" className="form-control" />
                                    <ErrorMessage
                                        name="nationality"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <Field name="email" className="form-control" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <Field name="phone" className="form-control" />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Player ID */}
                                <div className="col-md-6">
                                    <label className="form-label">Player ID</label>
                                    <Field name="playerId" className="form-control" />
                                    <ErrorMessage
                                        name="playerId"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Guardian Name (if <18) */}
                                <div className="col-md-6">
                                    <label className="form-label">Guardian Name</label>
                                    <Field name="guardianName" className="form-control" />
                                    <ErrorMessage
                                        name="guardianName"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                            </div>

                            {/* ---------------- Team & Event ---------------- */}
                            <h4 className="mt-4">Team & Event Information</h4>
                            <div className="row g-3">
                                {/* Team Name */}
                                <div className="col-md-6">
                                    <label className="form-label">Team Name</label>
                                    <Field name="teamName" className="form-control" />
                                    <ErrorMessage
                                        name="teamName"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* League Level */}
                                <div className="col-md-6">
                                    <label className="form-label">League Level</label>
                                    <Field as="select" name="leagueLevel" className="form-select">
                                        <option value="">Select...</option>
                                        <option>Amateur</option>
                                        <option>College</option>
                                        <option>Pro</option>
                                    </Field>
                                    <ErrorMessage
                                        name="leagueLevel"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Tournament Name */}
                                <div className="col-md-6">
                                    <label className="form-label">Tournament Name</label>
                                    <Field name="tournamentName" className="form-control" />
                                    <ErrorMessage
                                        name="tournamentName"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Start / End */}
                                <div className="col-md-3">
                                    <label className="form-label">Start Date</label>
                                    <Field type="date" name="startDate" className="form-control" />
                                    <ErrorMessage
                                        name="startDate"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">End Date</label>
                                    <Field type="date" name="endDate" className="form-control" />
                                    <ErrorMessage
                                        name="endDate"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Jersey Size (required if NOT Goalie) */}
                                <div className="col-md-6">
                                    <label className="form-label">Jersey Size</label>
                                    <Field as="select" name="jerseySize" className="form-select">
                                        <option value="">Select...</option>
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </Field>
                                    <ErrorMessage
                                        name="jerseySize"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Pad Size (required if Goalie) */}
                                <div className="col-md-6">
                                    <label className="form-label">Pad Size</label>
                                    <Field as="select" name="padSize" className="form-select">
                                        <option value="">Select...</option>
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                        <option>XL</option>
                                    </Field>
                                    <ErrorMessage
                                        name="padSize"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                            </div>

                            {/* ---------------- Medical & Consent ---------------- */}
                            <h4 className="mt-4">Medical & Consent</h4>
                            <div className="row g-3">
                                {/* Has Medical Condition */}
                                <div className="col-md-6 form-check">
                                    <Field
                                        type="checkbox"
                                        name="hasMedicalCondition"
                                        id="hasMedicalCondition"
                                        className="form-check-input"
                                    />
                                    <label htmlFor="hasMedicalCondition" className="form-check-label">
                                        Has medical condition
                                    </label>
                                </div>

                                {/* Medical Cert Number (required if checked) */}
                                <div className="col-md-6">
                                    <label className="form-label">Medical Cert Number</label>
                                    <Field name="medicalCertNumber" className="form-control" />
                                    <ErrorMessage
                                        name="medicalCertNumber"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>

                                {/* Consent */}
                                <div className="col-12 form-check mt-2">
                                    <Field
                                        type="checkbox"
                                        name="consent"
                                        id="consent"
                                        className="form-check-input"
                                    />
                                    <label htmlFor="consent" className="form-check-label">
                                        I confirm the information is correct and I consent to participate.
                                    </label>
                                    <ErrorMessage
                                        name="consent"
                                        component="div"
                                        className="text-danger"
                                    />
                                </div>
                            </div>

                            {/* ---------------- Past Teams (FieldArray) ---------------- */}
                            <h4 className="mt-4">Past Teams (max 3)</h4>
                            <FieldArray name="pastTeams">
                                {({ push, remove }) => (
                                    <>
                                        {values.pastTeams?.map((_, idx) => (
                                            <div className="row g-3 align-items-end" key={idx}>
                                                <div className="col-md-6">
                                                    <label className="form-label">Club Name</label>
                                                    <Field
                                                        name={`pastTeams[${idx}].clubName`}
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name={`pastTeams[${idx}].clubName`}
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <label className="form-label">Years</label>
                                                    <Field
                                                        name={`pastTeams[${idx}].years`}
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage
                                                        name={`pastTeams[${idx}].years`}
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </div>
                                                <div className="col-md-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger w-100"
                                                        onClick={() => remove(idx)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            className="btn btn-outline-primary mt-2"
                                            onClick={() => push({ clubName: "", years: "" })}
                                            disabled={values.pastTeams.length >= 3}
                                        >
                                            + Add Past Team
                                        </button>
                                    </>
                                )}
                            </FieldArray>

                            {/* ---------------- Actions ---------------- */}
                            <div className="mt-4 d-flex gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!isValid || isSubmitting} // ✅ disabled until valid
                                >
                                    Submit
                                </button>
                                <button
                                    type="reset"
                                    className="btn btn-secondary"
                                >
                                    Reset
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>

            {/* ---------------- Records Table ---------------- */}
            <h4 className="mt-5">Submitted Records</h4>
            <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Player Name</th>
                            <th>Jersey #</th>
                            <th>Pos</th>
                            <th>Stick</th>
                            <th>DOB</th>
                            <th>Nationality</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Player ID</th>
                            <th>Guardian</th>
                            <th>Team</th>
                            <th>League</th>
                            <th>Tournament</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Jersey</th>
                            <th>Pad</th>
                            <th>Medical?</th>
                            <th>MED #</th>
                            <th>Past Teams</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length === 0 ? (
                            <tr>
                                <td colSpan="20" className="text-center">
                                    No records yet.
                                </td>
                            </tr>
                        ) : (
                            records.map((r, i) => (
                                <tr key={i}>
                                    <td>{r.playerName}</td>
                                    <td>{r.jerseyNumber}</td>
                                    <td>{r.position}</td>
                                    <td>{r.stickHand}</td>
                                    <td>{r.dateOfBirth}</td>
                                    <td>{r.nationality}</td>
                                    <td>{r.email}</td>
                                    <td>{r.phone}</td>
                                    <td>{r.playerId}</td>
                                    <td>{r.guardianName}</td>
                                    <td>{r.teamName}</td>
                                    <td>{r.leagueLevel}</td>
                                    <td>{r.tournamentName}</td>
                                    <td>{r.startDate}</td>
                                    <td>{r.endDate}</td>
                                    <td>{r.jerseySize}</td>
                                    <td>{r.padSize}</td>
                                    <td>{r.hasMedicalCondition ? "Yes" : "No"}</td>
                                    <td>{r.medicalCertNumber}</td>
                                    <td>
                                        {r.pastTeams?.length
                                            ? r.pastTeams
                                                .map((p) => `${p.clubName} (${p.years}y)`)
                                                .join(", ")
                                            : "-"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
