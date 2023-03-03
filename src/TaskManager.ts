import mongoose from 'mongoose';
import  moment = require('moment')

export type callback = (data?:any) => any;

export type taskBody= {
    func: callback,
    interval: number
}


export class TaskManager{


    private tasks: {[key: string]: taskBody};
    

 
    constructor(private TaskSchema : mongoose.Model<any>){
        this.checkFunction();
        this.tasks = {};
    }


    private async checkFunction() : Promise<void> {
        

        const tasks = await this.TaskSchema.find({
            date: { $lte : new Date()}
        }).lean();


        if(tasks){
 
            tasks.forEach(async item => {
                const taskb = this.tasks[item.taskName];
                await taskb.func(item.functionArgs);
                    

                if(taskb.interval !== 0){
                    this.scheduleTask(
                        item.taskName,
                        item.desciription,
                        new Date(Date.now() +  taskb.interval),
                        item.functionArgs
                    );
                };

                    
            });
                

            this.checkFunction();
        }else{

            setTimeout(()=>{
                this.checkFunction()
            }, 1000);
        }


    }




    addTask(_name: string , _callback : callback, _interval: number = 0  ): taskBody{
        let tsk: taskBody;

        if(_name in this.tasks){
            throw new Error('Task name already exist')
        }else{

            tsk =  {
                func: _callback,
                interval: _interval
            };

            
            this.tasks[_name] = tsk
       
        }

        return tsk

    }



    async scheduleTask(name:string, desciription:string, date:Date, functionArgs: any): Promise<mongoose.Document>{


        if(name in this.tasks){
            const task = new this.TaskSchema({
                name,
                desciription,
                date,
                functionArgs,
            });
    
            return await task.save()
            
        }else{
            throw new Error('There is no task with this names')
    
        }
            

    }


}