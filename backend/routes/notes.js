const router = require('express').Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


//fetching all notes for a user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
    // res.send("hello");
});


//Adding a note 
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").isLength({ min: 5 }),
    body('description', "Enter a valid description").isLength({ min: 15 })
]
    , async (req, res) => {


        //if errors true returns 
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        //checks whether the email is already present or not
        else {
            const { title, description, tag } = req.body;
            try {
                const note = new Notes({
                    user: req.user.id,
                    title: title,
                    description: description,
                    tag: tag
                });
                const savedNote = await note.save();
                res.json(savedNote);
            }
            catch (err) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
    });

//Update an Existing Note
router.put('/updatenote/:id', fetchuser
    , async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            let updateNote = {};
            if (title) { updateNote.title = title }
            if (description) { updateNote.description = description }
            if (tag) { updateNote.tag = tag }
            console.log(req.params.id);
            //finding the note to be updated
            let note = await Notes.findById(req.params.id);

            if (!note) { return res.status(404).send("Not found"); }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Access Denied");
            }
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: updateNote }, { new: true });
            res.send(note);
        }
        catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });


    //Deleting a Note using a ID
    router.delete('/deletenote/:id',fetchuser,async (req,res) => {
        try {
            let note = await Notes.findById(req.params.id);

            if (!note) { return res.status(404).send("Not found"); }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Access Denied");
            }
            note = await Notes.findByIdAndDelete(req.params.id);
            res.json({"Success":"Note has been deleted",note:note});
        }
        catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

module.exports = router;