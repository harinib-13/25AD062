/* =========================================================
   EXAMFLOW - FINAL FRONTEND JAVASCRIPT
   ========================================================= */


/* =========================================================
   API
   ========================================================= */

/*
 * IMPORTANT:
 * The frontend is running on localhost:8081.
 * Using window.location.origin means the API also uses
 * localhost:8081 automatically.
 */

const API_BASE = window.location.origin;


const API = {

    examSessions:
        `${API_BASE}/api/examsession`,

    halls:
        `${API_BASE}/api/hall`,

    seats:
        `${API_BASE}/api/seat`,

    students:
        `${API_BASE}/api/student`
};


/* =========================================================
   STATE
   ========================================================= */

let currentModule = "dashboard";

let currentEditId = null;

let currentRecords = [];


/* =========================================================
   MODULE CONFIGURATION
   ========================================================= */

const MODULES = {


    /* -----------------------------------------------------
       EXAM SESSIONS
    ----------------------------------------------------- */

    examsessions: {

        title: "Exam Sessions",

        subtitle:
            "Schedule and manage examination sessions",

        endpoint:
        API.examSessions,

        columns: [

            {
                key: "id",
                label: "ID"
            },

            {
                key: "examName",
                label: "EXAM NAME"
            },

            {
                key: "examDate",
                label: "EXAM DATE"
            },

            {
                key: "startTime",
                label: "START TIME"
            },

            {
                key: "endTime",
                label: "END TIME"
            }

        ],

        fields: [

            {
                name: "examName",
                label: "Exam Name",
                type: "text",
                required: true,
                placeholder: "Enter exam name"
            },

            {
                name: "examDate",
                label: "Exam Date",
                type: "date",
                required: true
            },

            {
                name: "startTime",
                label: "Start Time",
                type: "time",
                required: true
            },

            {
                name: "endTime",
                label: "End Time",
                type: "time",
                required: true
            }

        ]
    },


    /* -----------------------------------------------------
       EXAMINATION HALLS
    ----------------------------------------------------- */

    halls: {

        title:
            "Examination Halls",

        subtitle:
            "Manage examination halls and seating capacity",

        endpoint:
        API.halls,

        columns: [

            {
                key: "id",
                label: "ID"
            },

            {
                key: "hallName",
                label: "HALL NAME"
            },

            {
                key: "location",
                label: "LOCATION"
            },

            {
                key: "capacity",
                label: "CAPACITY"
            }

        ],

        fields: [

            {
                name: "hallName",
                label: "Hall Name",
                type: "text",
                required: true,
                placeholder: "Example: Hall A"
            },

            {
                name: "location",
                label: "Location",
                type: "text",
                required: true,
                placeholder: "Example: Main Block"
            },

            {
                name: "capacity",
                label: "Capacity",
                type: "number",
                required: true,
                min: 1,
                placeholder: "Enter capacity"
            }

        ]
    },


    /* -----------------------------------------------------
       SEATS
    ----------------------------------------------------- */

    seats: {

        title:
            "Seat Management",

        subtitle:
            "Assign and manage examination seats",

        endpoint:
        API.seats,

        columns: [

            {
                key: "id",
                label: "ID"
            },

            {
                key: "seatNumber",
                label: "SEAT NUMBER"
            },

            {
                key: "hallId",
                label: "HALL ID"
            },

            {
                key: "studentId",
                label: "STUDENT ID"
            }

        ],

        fields: [

            {
                name: "seatNumber",
                label: "Seat Number",
                type: "text",
                required: true,
                placeholder: "Example: A01"
            },

            {
                name: "hallId",
                label: "Hall ID",
                type: "number",
                required: true,
                placeholder: "Enter hall ID"
            },

            {
                name: "studentId",
                label: "Student ID",
                type: "number",
                required: true,
                placeholder: "Enter student ID"
            }

        ]
    },


    /* -----------------------------------------------------
       STUDENTS
    ----------------------------------------------------- */

    students: {

        title:
            "Students",

        subtitle:
            "Manage student examination records",

        endpoint:
        API.students,

        columns: [

            {
                key: "id",
                label: "ID"
            },

            {
                key: "name",
                label: "NAME"
            },

            {
                key: "registerNumber",
                label: "REGISTER NUMBER"
            },

            {
                key: "department",
                label: "DEPARTMENT"
            },

            {
                key: "year",
                label: "YEAR"
            }

        ],

        fields: [

            {
                name: "name",
                label: "Student Name",
                type: "text",
                required: true,
                placeholder: "Enter student name"
            },

            {
                name: "registerNumber",
                label: "Register Number",
                type: "text",
                required: true,
                placeholder: "Enter register number"
            },

            {
                name: "department",
                label: "Department",
                type: "text",
                required: true,
                placeholder: "Example: AI & DS"
            },

            {
                name: "year",
                label: "Year",
                type: "number",
                required: true,
                min: 1,
                max: 4,
                placeholder: "Example: 2"
            }

        ]
    }

};


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log("ExamFlow frontend loaded");

        initializeNavigation();

        initializeModal();

        initializeMobileMenu();

        showDashboard();

        checkBackendConnection();

    }
);


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const module =
                    item.dataset.module;


                navItems.forEach(
                    nav =>
                        nav.classList.remove("active")
                );


                item.classList.add("active");


                currentModule = module;


                if (module === "dashboard") {

                    showDashboard();

                } else {

                    showModule(module);

                }


                closeMobileMenu();

            }
        );

    });
}


/* =========================================================
   DASHBOARD
   ========================================================= */

async function showDashboard() {

    currentModule = "dashboard";


    const page =
        document.getElementById("page");


    if (!page) return;


    page.innerHTML = `

        <div class="dashboard-header">

            <div>

                <span class="section-label">
                    EXAMINATION MANAGEMENT
                </span>

                <h1>
                    Examination Operations Dashboard
                </h1>

                <p>
                    Centralized management of exam sessions,
                    halls, seats and students.
                </p>

            </div>


            <div class="dashboard-date">

                <strong>
                    ${formatDashboardDate()}
                </strong>

                <span>
                    Academic Administration
                </span>

            </div>

        </div>


        <div class="stats-grid">


            <div class="stat-card">

                <div class="stat-icon blue">
                    ▣
                </div>

                <div class="stat-info">

                    <span>
                        Exam Sessions
                    </span>

                    <strong id="dashboardExamCount">
                        --
                    </strong>

                    <small>
                        Scheduled sessions
                    </small>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon purple">
                    ▦
                </div>

                <div class="stat-info">

                    <span>
                        Examination Halls
                    </span>

                    <strong id="dashboardHallCount">
                        --
                    </strong>

                    <small>
                        Available halls
                    </small>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon cyan">
                    ⌘
                </div>

                <div class="stat-info">

                    <span>
                        Total Seats
                    </span>

                    <strong id="dashboardSeatCount">
                        --
                    </strong>

                    <small>
                        Managed seats
                    </small>

                </div>

            </div>


            <div class="stat-card">

                <div class="stat-icon green">
                    ♙
                </div>

                <div class="stat-info">

                    <span>
                        Students
                    </span>

                    <strong id="dashboardStudentCount">
                        --
                    </strong>

                    <small>
                        Registered students
                    </small>

                </div>

            </div>

        </div>


        <div class="dashboard-grid">


            <div class="card">

                <div class="card-header">

                    <div>

                        <h2>
                            Exam Management
                        </h2>

                        <p>
                            Quick access to examination modules
                        </p>

                    </div>

                </div>


                <div class="quick-grid">

                    ${quickCard(
        "examsessions",
        "▣",
        "Exam Sessions",
        "Schedule examinations"
    )}

                    ${quickCard(
        "halls",
        "▦",
        "Examination Halls",
        "Manage halls"
    )}

                    ${quickCard(
        "seats",
        "⌘",
        "Seat Management",
        "Manage seat allocation"
    )}

                    ${quickCard(
        "students",
        "♙",
        "Students",
        "Manage student records"
    )}

                </div>

            </div>


            <div class="card">

                <div class="card-header">

                    <div>

                        <h2>
                            System Status
                        </h2>

                        <p>
                            Application connectivity
                        </p>

                    </div>

                </div>


                <div class="system-status">

                    <div class="status-row">

                        <span>
                            Backend API
                        </span>

                        <span
                            class="badge"
                            id="dashboardApiStatus"
                        >
                            Checking
                        </span>

                    </div>


                    <div class="status-row">

                        <span>
                            Exam Sessions
                        </span>

                        <span id="statusExam">
                            Checking...
                        </span>

                    </div>


                    <div class="status-row">

                        <span>
                            Examination Halls
                        </span>

                        <span id="statusHall">
                            Checking...
                        </span>

                    </div>


                    <div class="status-row">

                        <span>
                            Seat Management
                        </span>

                        <span id="statusSeat">
                            Checking...
                        </span>

                    </div>


                    <div class="status-row">

                        <span>
                            Students
                        </span>

                        <span id="statusStudent">
                            Checking...
                        </span>

                    </div>

                </div>

            </div>

        </div>


        <div class="card recent-card">

            <div class="card-header">

                <div>

                    <h2>
                        System Overview
                    </h2>

                    <p>
                        Exam administration modules
                    </p>

                </div>

            </div>


            <div class="overview-list">


                <div class="overview-item">

                    <div class="overview-number">
                        01
                    </div>

                    <div>

                        <strong>
                            Exam Sessions
                        </strong>

                        <p>
                            Create and schedule examinations
                            with date and time.
                        </p>

                    </div>

                </div>


                <div class="overview-item">

                    <div class="overview-number">
                        02
                    </div>

                    <div>

                        <strong>
                            Examination Halls
                        </strong>

                        <p>
                            Maintain hall information and
                            seating capacity.
                        </p>

                    </div>

                </div>


                <div class="overview-item">

                    <div class="overview-number">
                        03
                    </div>

                    <div>

                        <strong>
                            Seat Management
                        </strong>

                        <p>
                            Allocate seats to halls
                            and students.
                        </p>

                    </div>

                </div>


                <div class="overview-item">

                    <div class="overview-number">
                        04
                    </div>

                    <div>

                        <strong>
                            Students
                        </strong>

                        <p>
                            Maintain student registration
                            and examination records.
                        </p>

                    </div>

                </div>


            </div>

        </div>
    `;


    loadDashboardCounts();
}


/* =========================================================
   QUICK CARD
   ========================================================= */

function quickCard(
    module,
    icon,
    title,
    description
) {

    return `

        <button
            class="quick-card"
            onclick="showModule('${module}')"
        >

            <div class="quick-icon">
                ${icon}
            </div>

            <div>

                <strong>
                    ${title}
                </strong>

                <span>
                    ${description}
                </span>

            </div>

            <span class="quick-arrow">
                →
            </span>

        </button>

    `;
}


/* =========================================================
   DASHBOARD COUNTS
   ========================================================= */

async function loadDashboardCounts() {

    const modules = [

        [
            "examsessions",
            "dashboardExamCount",
            "statusExam"
        ],

        [
            "halls",
            "dashboardHallCount",
            "statusHall"
        ],

        [
            "seats",
            "dashboardSeatCount",
            "statusSeat"
        ],

        [
            "students",
            "dashboardStudentCount",
            "statusStudent"
        ]

    ];


    for (
        const [module, countId, statusId]
        of modules
        ) {

        const config =
            MODULES[module];


        try {

            const response =
                await fetch(config.endpoint);


            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }


            const data =
                await response.json();


            const records =
                normalizeArray(data);


            const count =
                document.getElementById(countId);


            const status =
                document.getElementById(statusId);


            if (count) {

                count.textContent =
                    records.length;

            }


            if (status) {

                status.innerHTML =
                    `<span class="badge success">
                        Available
                    </span>`;

            }

        } catch (error) {

            console.error(
                module,
                error
            );


            const count =
                document.getElementById(countId);


            const status =
                document.getElementById(statusId);


            if (count) {
                count.textContent = "0";
            }


            if (status) {

                status.innerHTML =
                    `<span class="badge danger">
                        Unavailable
                    </span>`;

            }

        }

    }
}


/* =========================================================
   MODULE PAGE
   ========================================================= */

async function showModule(moduleName) {

    const config =
        MODULES[moduleName];


    if (!config) {

        showToast(
            "Module not found.",
            "error"
        );

        return;
    }


    currentModule =
        moduleName;


    const page =
        document.getElementById("page");


    page.innerHTML = `

        <div class="page-header">

            <div>

                <span class="section-label">
                    MANAGEMENT MODULE
                </span>

                <h1>
                    ${config.title}
                </h1>

                <p>
                    ${config.subtitle}
                </p>

            </div>


            <button
                class="btn primary"
                onclick="openAddModal()"
            >

                ＋

                Add ${shortTitle(config.title)}

            </button>

        </div>


        <div class="toolbar">

            <div class="search-box">

                <span>
                    ⌕
                </span>

                <input
                    id="searchInput"
                    type="text"
                    placeholder="Search ${config.title.toLowerCase()}..."
                >

            </div>


            <button
                class="btn secondary"
                onclick="loadRecords()"
            >

                ↻

                Refresh

            </button>

        </div>


        <div class="card table-card">

            <div class="table-container">

                <table>

                    <thead>

                        <tr>

                            ${config.columns
        .map(
            column =>
                `<th>
                                            ${column.label}
                                        </th>`
        )
        .join("")
    }

                            <th>
                                ACTIONS
                            </th>

                        </tr>

                    </thead>


                    <tbody
                        id="recordsTableBody"
                    >

                        <tr>

                            <td
                                colspan="${config.columns.length + 1}"
                                class="loading"
                            >

                                <div class="spinner"></div>

                                Loading records...

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>
    `;


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                renderTable(
                    filterRecords(
                        currentRecords,
                        searchInput.value
                    )
                );

            }
        );
    }


    await loadRecords();
}


/* =========================================================
   LOAD RECORDS
   ========================================================= */

async function loadRecords() {

    const config =
        MODULES[currentModule];


    if (!config) return;


    const tbody =
        document.getElementById(
            "recordsTableBody"
        );


    if (tbody) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="${config.columns.length + 1}"
                    class="loading"
                >

                    <div class="spinner"></div>

                    Loading records...

                </td>

            </tr>

        `;
    }


    try {

        const response =
            await fetch(
                config.endpoint
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        const data =
            await response.json();


        currentRecords =
            normalizeArray(data);


        renderTable(
            currentRecords
        );


    } catch (error) {

        console.error(
            "Load records error:",
            error
        );


        currentRecords = [];


        if (tbody) {

            tbody.innerHTML = `

                <tr>

                    <td
                        colspan="${config.columns.length + 1}"
                        class="empty-state"
                    >

                        <div class="empty-state-icon">
                            ⚠
                        </div>

                        <h3>
                            Unable to load records
                        </h3>

                        <p>
                            Make sure the Spring Boot
                            backend is running.
                        </p>

                        <button
                            class="btn secondary"
                            onclick="loadRecords()"
                        >
                            Try Again
                        </button>

                    </td>

                </tr>

            `;

        }

    }
}


/* =========================================================
   NORMALIZE RESPONSE
   ========================================================= */

function normalizeArray(data) {

    if (Array.isArray(data)) {

        return data;

    }


    if (
        data &&
        Array.isArray(data.content)
    ) {

        return data.content;

    }


    if (
        data &&
        Array.isArray(data.data)
    ) {

        return data.data;

    }


    if (
        data &&
        Array.isArray(data.result)
    ) {

        return data.result;

    }


    return [];
}


/* =========================================================
   TABLE
   ========================================================= */

function renderTable(records) {

    const config =
        MODULES[currentModule];


    const tbody =
        document.getElementById(
            "recordsTableBody"
        );


    if (!tbody) return;


    if (!records.length) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="${config.columns.length + 1}"
                    class="empty-state"
                >

                    <div class="empty-state-icon">
                        ◫
                    </div>

                    <h3>
                        No records found
                    </h3>

                    <p>
                        No ${config.title.toLowerCase()}
                        have been added yet.
                    </p>

                    <button
                        class="btn primary"
                        onclick="openAddModal()"
                    >
                        ＋ Add Record
                    </button>

                </td>

            </tr>

        `;

        return;
    }


    tbody.innerHTML =
        records
            .map(function (record) {

                const id =
                    getId(record);


                return `

                    <tr>

                        ${config.columns
                    .map(function (column) {

                        let value =
                            getProperty(
                                record,
                                column.key
                            );


                        if (
                            column.key
                                .toLowerCase()
                                .includes("date")
                        ) {

                            value =
                                formatDate(
                                    value
                                );

                        }


                        if (
                            column.key
                                .toLowerCase()
                                .includes("time")
                        ) {

                            value =
                                formatTime(
                                    value
                                );

                        }


                        return `
                                    <td>
                                        ${escapeHTML(value)}
                                    </td>
                                `;

                    })
                    .join("")
                }


                        <td>

                            <div class="action-buttons">

                                <button
                                    class="action-btn edit"
                                    title="Edit"
                                    onclick="openEditModal(${id})"
                                >
                                    ✎
                                </button>


                                <button
                                    class="action-btn delete"
                                    title="Delete"
                                    onclick="deleteRecord(${id})"
                                >
                                    🗑
                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            })
            .join("");
}


/* =========================================================
   ADD MODAL
   ========================================================= */

function openAddModal() {

    currentEditId = null;


    const config =
        MODULES[currentModule];


    if (!config) return;


    document.getElementById(
        "modalTitle"
    ).textContent =
        `Add ${shortTitle(config.title)}`;


    document.getElementById(
        "modalDescription"
    ).textContent =
        `Enter the details for the new ${shortTitle(config.title).toLowerCase()}.`;


    buildForm(
        config.fields,
        {}
    );


    document.getElementById(
        "modal"
    ).classList.add("show");
}


/* =========================================================
   EDIT MODAL
   ========================================================= */

function openEditModal(id) {

    const config =
        MODULES[currentModule];


    const record =
        currentRecords.find(
            item =>
                Number(
                    getId(item)
                ) === Number(id)
        );


    if (!record) {

        showToast(
            "Record not found.",
            "error"
        );

        return;
    }


    currentEditId = id;


    document.getElementById(
        "modalTitle"
    ).textContent =
        `Edit ${shortTitle(config.title)}`;


    document.getElementById(
        "modalDescription"
    ).textContent =
        `Update the details of this ${shortTitle(config.title).toLowerCase()}.`;


    buildForm(
        config.fields,
        record
    );


    document.getElementById(
        "modal"
    ).classList.add("show");
}


/* =========================================================
   BUILD FORM
   ========================================================= */

function buildForm(
    fields,
    record
) {

    const container =
        document.getElementById(
            "formFields"
        );


    container.innerHTML =
        fields
            .map(function (field) {

                let value =
                    getProperty(
                        record,
                        field.name
                    );


                if (
                    value === undefined ||
                    value === null
                ) {

                    value = "";

                }


                if (
                    field.type === "date"
                ) {

                    value =
                        formatInputDate(
                            value
                        );

                }


                if (
                    field.type === "time"
                ) {

                    value =
                        formatInputTime(
                            value
                        );

                }


                return `

                    <div class="form-group">

                        <label
                            for="field-${field.name}"
                        >

                            ${field.label}

                            ${
                    field.required
                        ? `<span>*</span>`
                        : ""
                }

                        </label>


                        <input
                            id="field-${field.name}"
                            name="${field.name}"
                            type="${field.type}"
                            value="${escapeAttribute(value)}"

                            ${
                    field.required
                        ? "required"
                        : ""
                }

                            ${
                    field.min !== undefined
                        ? `min="${field.min}"`
                        : ""
                }

                            ${
                    field.max !== undefined
                        ? `max="${field.max}"`
                        : ""
                }

                            placeholder="${field.placeholder || ""}"
                        >

                    </div>

                `;

            })
            .join("");
}


/* =========================================================
   SAVE
   ========================================================= */

async function saveRecord(event) {

    event.preventDefault();


    const config =
        MODULES[currentModule];


    if (!config) return;


    const form =
        document.getElementById(
            "recordForm"
        );


    const formData =
        new FormData(form);


    const payload = {};


    config.fields.forEach(
        function (field) {

            let value =
                formData.get(
                    field.name
                );


            if (
                field.type === "number" &&
                value !== ""
            ) {

                value =
                    Number(value);

            }


            payload[field.name] =
                value;

        }
    );


    /* Validate exam time */

    if (
        currentModule === "examsessions" &&
        payload.startTime &&
        payload.endTime &&
        payload.startTime >= payload.endTime
    ) {

        showToast(
            "End time must be after start time.",
            "error"
        );

        return;
    }


    const saveButton =
        document.getElementById(
            "saveBtn"
        );


    saveButton.disabled = true;


    saveButton.innerHTML = `
        <span class="button-spinner"></span>
        Saving...
    `;


    try {

        let url =
            config.endpoint;


        let method =
            "POST";


        if (
            currentEditId !== null
        ) {

            method =
                "PUT";

            url =
                `${config.endpoint}/${currentEditId}`;

        }


        console.log(
            "Saving:",
            method,
            url,
            payload
        );


        const response =
            await fetch(
                url,
                {

                    method,

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            payload
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        closeModal();


        showToast(
            currentEditId === null
                ? "Record created successfully."
                : "Record updated successfully.",
            "success"
        );


        await loadRecords();


    } catch (error) {

        console.error(
            "Save error:",
            error
        );


        showToast(
            "Unable to save record. Check the backend API.",
            "error"
        );


    } finally {

        saveButton.disabled =
            false;


        saveButton.innerHTML =
            "✓ Save Record";

    }
}


/* =========================================================
   DELETE
   ========================================================= */

async function deleteRecord(id) {

    const config =
        MODULES[currentModule];


    if (!config) return;


    const confirmed =
        confirm(
            "Are you sure you want to delete this record?"
        );


    if (!confirmed) return;


    try {

        const response =
            await fetch(
                `${config.endpoint}/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        showToast(
            "Record deleted successfully.",
            "success"
        );


        await loadRecords();


    } catch (error) {

        console.error(
            error
        );


        showToast(
            "Unable to delete record. Check the backend API.",
            "error"
        );

    }
}


/* =========================================================
   MODAL
   ========================================================= */

function initializeModal() {

    const modal =
        document.getElementById(
            "modal"
        );


    document.getElementById(
        "closeModal"
    ).addEventListener(
        "click",
        closeModal
    );


    document.getElementById(
        "cancelModal"
    ).addEventListener(
        "click",
        closeModal
    );


    document.getElementById(
        "recordForm"
    ).addEventListener(
        "submit",
        saveRecord
    );


    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeModal();

            }

        }
    );
}


function closeModal() {

    const modal =
        document.getElementById(
            "modal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    currentEditId = null;
}


/* =========================================================
   BACKEND CONNECTION
   ========================================================= */

async function checkBackendConnection() {

    const status =
        document.getElementById(
            "apiStatus"
        );


    try {

        const response =
            await fetch(
                API.examSessions
            );


        if (!response.ok) {

            throw new Error(
                "Backend unavailable"
            );

        }


        if (status) {

            status.innerHTML = `
                <span class="status-dot"></span>
                API Connected
            `;

            status.classList.remove(
                "offline"
            );

        }


        const dashboardStatus =
            document.getElementById(
                "dashboardApiStatus"
            );


        if (dashboardStatus) {

            dashboardStatus.className =
                "badge success";

            dashboardStatus.textContent =
                "Connected";

        }


    } catch (error) {

        console.error(
            "API connection error:",
            error
        );


        if (status) {

            status.innerHTML = `
                <span class="status-dot"></span>
                API Offline
            `;

            status.classList.add(
                "offline"
            );

        }


        const dashboardStatus =
            document.getElementById(
                "dashboardApiStatus"
            );


        if (dashboardStatus) {

            dashboardStatus.className =
                "badge danger";

            dashboardStatus.textContent =
                "Offline";

        }

    }
}


/* =========================================================
   MOBILE
   ========================================================= */

function initializeMobileMenu() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (!sidebar) return;


    let button =
        document.querySelector(
            ".mobile-menu-btn"
        );


    if (!button) {

        button =
            document.createElement(
                "button"
            );


        button.className =
            "mobile-menu-btn";


        button.innerHTML =
            "☰";


        document.body.appendChild(
            button
        );


        button.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );
    }
}


function closeMobileMenu() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }
}


/* =========================================================
   SEARCH
   ========================================================= */

function filterRecords(
    records,
    query
) {

    if (!query) {

        return records;

    }


    const search =
        query
            .toLowerCase()
            .trim();


    return records.filter(
        function (record) {

            return Object.values(
                record
            )
                .join(" ")
                .toLowerCase()
                .includes(search);

        }
    );
}


/* =========================================================
   HELPERS
   ========================================================= */

function getProperty(
    object,
    key
) {

    if (!object) return "";


    if (
        object[key] !== undefined
    ) {

        return object[key];

    }


    const matchingKey =
        Object.keys(object).find(
            function (existingKey) {

                return (
                    existingKey.toLowerCase() ===
                    key.toLowerCase()
                );

            }
        );


    return matchingKey
        ? object[matchingKey]
        : "";
}


function getId(record) {

    return (
        getProperty(record, "id") ||
        getProperty(record, "ID")
    );
}


function shortTitle(title) {

    return title
        .replace(
            "Examination ",
            ""
        )
        .replace(
            " Management",
            ""
        );
}


function formatDate(value) {

    if (!value) return "-";


    try {

        const date =
            new Date(value);


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return value;

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    } catch {

        return value;

    }
}


function formatInputDate(value) {

    if (!value) return "";


    if (
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {

        return value;

    }


    const date =
        new Date(value);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return value;

    }


    return date
        .toISOString()
        .split("T")[0];
}


function formatTime(value) {

    if (!value) return "-";


    if (
        typeof value === "string" &&
        /^\d{2}:\d{2}/.test(value)
    ) {

        return value.substring(
            0,
            5
        );

    }


    return value;
}


function formatInputTime(value) {

    if (!value) return "";


    if (
        typeof value === "string" &&
        /^\d{2}:\d{2}/.test(value)
    ) {

        return value.substring(
            0,
            5
        );

    }


    return value;
}


function formatDashboardDate() {

    return new Date()
        .toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );
}


/* =========================================================
   SECURITY / DISPLAY
   ========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "-";

    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


function escapeAttribute(value) {

    return String(
        value || ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    message,
    type = "success"
) {

    const container =
        document.getElementById(
            "toasts"
        );


    if (!container) return;


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `toast ${type}`;


    const icon =
        type === "success"
            ? "✓"
            : "!";


    toast.innerHTML = `

        <div class="toast-icon">
            ${icon}
        </div>


        <div class="toast-content">

            <strong>
                ${
        type === "success"
            ? "Success"
            : "Error"
    }
            </strong>

            <span>
                ${escapeHTML(message)}
            </span>

        </div>


        <button
            class="toast-close"
            onclick="this.parentElement.remove()"
        >
            ×
        </button>

    `;


    container.appendChild(
        toast
    );


    setTimeout(
        function () {

            if (
                toast.parentElement
            ) {

                toast.remove();

            }

        },
        4500
    );
}


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.showDashboard =
    showDashboard;

window.showModule =
    showModule;

window.openAddModal =
    openAddModal;

window.openEditModal =
    openEditModal;

window.deleteRecord =
    deleteRecord;

window.closeModal =
    closeModal;

window.loadRecords =
    loadRecords;

window.showToast =
    showToast;