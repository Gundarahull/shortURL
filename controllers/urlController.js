

const Url = require('../models/url.model')
const { nanoid } = require("nanoid")

const createShortUrl = async (req, res) => {
    try {
        console.log("Stage-01")
        const { originalUrl, customAlias } = req.body

        // Checking the request
        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "Please send the Original Url"
            })
        }
        console.log("Stage-02")

        //Generating the short code
        const shortCode = customAlias || nanoid(6)

        //checking the ShortCode
        const existing = await Url.findOne({ shortCode })
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Already Exists"
            })
        }

        console.log("Stage-03")
        //Expired

        const myDate = new Date(); // Current date
        myDate.setDate(myDate.getDate() + 180);

        //CreatingURL
        const url = await Url.create({
            originalUrl,
            shortCode: customAlias,
            expiresAt: myDate
        })
        console.log("Stage-04")

        return res.status(201).json({
            success: true,
            message: "Short URL created Succesfully",
            data: url
        })


    } catch (error) {
        console.log("Error at createShortUrl controller : ", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

const redirectURL = async (req, res) => {
    try {
        const { shortCode } = req.params


        //Check ShortCode
        const existing = await Url.findOne({ shortCode: shortCode.toString() })

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: " Short URL not found"
            })
        }

        //Check Expiration
        if (existing.expiresAt < new Date()) {
            return res.status(410).json({
                success: false,
                message: "Short URL has Expired"
            })
        }

        //Increase count click

        existing.clickCount += 1

        await existing.save()

        res.redirect(existing.originalUrl)


    } catch (error) {
        console.log("Error at Redirecting the URL :", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

const deleteURL = async (req, res) => {
    try {
        const { shortCode } = req.params

        const url = await Url.findOneAndDelete({ shortCode })
        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short Code is not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "URL Succesfully Deleted"
        })

    } catch (error) {

        console.log("Error at Deleting  the URL :", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getDetails = async (req, res) => {
    try {

        const { shortCode } = req.params

        const url = await Url.findOne({ shortCode })
        if (!url) {
            return res.status(404).json({
                success: false,
                message: "URL is not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Fetching the URL details",
            data: url
        })

    } catch (error) {
        console.log("Error at Getting details  the URL :", error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

module.exports = {
    createShortUrl,
    redirectURL,
    deleteURL,
    getDetails
}