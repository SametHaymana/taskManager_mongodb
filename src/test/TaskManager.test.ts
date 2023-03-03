import { TaskManager } from "../index";
import mongoose from "mongoose";

describe("Taskmanger",()=>{
    test("TaskManager init",()=>{
        const schema = new mongoose.Schema({
            name: String,
            desciription : String,
            date: Date,
            functionArgs: mongoose.Schema.Types.Mixed
        })
        const taskManager = new TaskManager(mongoose.model("test",schema))
        expect(taskManager).toBe(TaskManager)
    
    })
})
