const db = require("../config/db");
const logActivity = require("../utils/logger");

exports.createTask = (req, res) => {
    const { title, description, status } = req.body;

    db.query(
        "INSERT INTO tasks (user_id, title, description, status) VALUES (?,?,?,?)",
        [req.user.id, title, description, status],
        err => {
            if (err) return res.status(500).json(err);
            logActivity(req.user.id, "Task Created");
            res.json({ message: "Task created" });
        }
    );
};

exports.getTasks = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page -1)* limit;

    db.query(
        "SELECT * FROM tasks WHERE user_id = ? LIMIT ? OFFSET ?",
        [req.user.id, limit, offset],
        (err, results) => {
            if (err) return res.status(500).json(err);
            res.json({page, results });
        }
    );
};

exports.updateTask = (req, res) => {
    const {title, description, status } = req.body;

    db.query(
        " UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=? ",
        [title, description, status, req.params.id, req.user.id],
        err => {
            if (err) return res.status(500).json(err);

            logActivity(req.user.id, "Task Updated");

            res.json({message: "Task updated" });
        }
);
};

exports.deleteTask = (req, res) => {
    db.query(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        [req.params.id, req.user.id],
        (err) => {
            if (err) return res.status(500).json(err);
            logActivity(req.user.id, "Task Deleted");
            res.json({message: "Task deleted"});
        }
    );
};
