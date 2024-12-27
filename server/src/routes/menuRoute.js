const express = require('express');
const router = express.Router();

const {
    getAllMenu,
    addSubChildMenu,
    addParentMenu,
    addChildMenu,
    getChildMenu,
} = require('../controllers/MenuController');

router.get('/get-all', getAllMenu);
router.post('/add-parentMenu', addParentMenu);
router.post('/add-childMenu/:parentId', addChildMenu);
router.post('/add-subchildmenu/:parentId', addSubChildMenu);
router.get('/get-child-menu', getChildMenu);

module.exports = router;
