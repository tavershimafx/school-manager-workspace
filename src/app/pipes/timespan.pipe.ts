import { Pipe, PipeTransform } from "@angular/core";
import { formatMoney, getInitials, toSentenceCase } from "@services/utilities";
//import { UtilityFunctions } from "@services/functions";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
@Pipe({
    name: "timespan",
    standalone: false
})
export class TimespanPipe implements PipeTransform{

    transform(value: any) {
        if (value == null || value == undefined)
            return ""

        if (typeof(value) === 'string'){
            return this.getSpan(new Date(value))
        }

        if (typeof(value) === 'object' && value instanceof Date){
            return this.getSpan(value)
        }

        return value
    }

    private isSameDay(date: Date){
        const now = new Date();
        return date.getFullYear() == now.getFullYear() 
            && date.getMonth() == now.getMonth()
            && date.getDate() == now.getDate()
    }

    private getSpan(date: Date){
        let totalSecs = (Date.now() - date.getTime()) / 1000; // actual secs

        // if not in the same day just skip
        if (this.isSameDay(date)){ // 24hrs
            const nneHour = totalSecs / (60 * 60)
            if (nneHour < 1){ // 1 hr
                if (totalSecs < 60){ // 1 min
                    return `${Math.floor(totalSecs)}s ago`
                }

                return `${Math.floor(totalSecs / 60)}m ago`
            }

            const shortTime:any = {
                hour: "numeric",
                minute: "numeric",
                second: undefined
              };
            return date.toLocaleTimeString("en-US", shortTime)
        }else{
            const dd = 60 * 60 * 24 * 7 // 7 days
            if (totalSecs < dd){
                let day = Math.floor(totalSecs / (60 * 60 * 24))
                return day == 1? "Yesterday" : days[date.getDay()]
            }else{
                return date.toLocaleDateString()
            }
        }
    }
}

@Pipe({
    name: "money",
    standalone: false
})
export class MoneyPipe implements PipeTransform{

    transform(value: any) {
        if (value == null || value == undefined)
            return ""

        if (typeof(value) === 'string' || typeof(value) === 'number'){
            return `₦${formatMoney(value)}`
        }

        return value
    }
}

@Pipe({
    name: "sentencecase",
    standalone: false
})
export class SentenceCasePipe implements PipeTransform{
    transform(value: any) {
        return toSentenceCase(value)
    }
}

@Pipe({
    name: "initials",
    standalone: false
})
export class InitialsPipe implements PipeTransform{
    transform(value: any) {
        return getInitials(value)
    }
}