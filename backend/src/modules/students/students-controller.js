const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { name, className, section, roll  } = req.query;
    const list = await getAllStudents({ name, className, section, roll });

    return res.json({students: list});
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const studentInfo = { ...req.body }

    const emailSendingResult = await addNewStudent(studentInfo);

    const responseMessage = emailSendingResult?.message || 'A student has been successfully added!';

    return res.json({message: responseMessage});
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const updateResult = await updateStudent({ ...req.body, userId });
    
    return res.json(updateResult);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const studentInfo = await getStudentDetail(req.params.id || null);

    return res.json(studentInfo);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { id: userId } = req.params;
    const { id: reviewerId } = req.user; 
    const status = req.body.status;

    const payload = { userId, reviewerId, status };

    const updatedStatusInfo = await setStudentStatus(payload);

    return res.json(updatedStatusInfo);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
