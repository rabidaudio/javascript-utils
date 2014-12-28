Date = (function(D){
/*  Appends some useful natural language methods to Date. American system only.
    Written by Charles Knight, charles@rabidaudio.com - 2014
*/
    //configure
    D.natural = {
        referenceDate: null,
        roundTime: 0,
    };

    var module = D.prototype;

    module.getNaturalTime = function(opts){
        var d = this;
        var round;
        if(opts && opts.roundTime){
            round = opts.roundTime % 60;
        }else{
            round = (D.natural.roundTime || 0) % 60;
        }
        if(round > 0)
            d.setMinutes(Math.round(d.getMinutes()/round)*round);
        var hours = d.getHours();
        var minutes = d.getMinutes();

        var ampm = (hours >= 12 ? "pm" : "am");

        var day_minutes = hours*60+minutes;

        var noon = (day_minutes >= (11.5*60) && day_minutes <= (12.5*60));
        var midnight = (day_minutes >= (23.5*60) || day_minutes <= (1.5*60));

        if(noon || midnight){
            var result = [];
            if(minutes>30 && minutes != 0){
                result.push(pluralize(60-minutes, "minute"));
                result.push(noon ? "before" : "to");
            }else if(minutes != 0){
                result.push(pluralize(minutes, "minute"));
                result.push(noon ? "after" : "past");
            }
            result.push(noon ? "noon" : "midnight");
            return result.join(" ");
        }

        hours = (hours % 12)+"";
        if(minutes==0)
            return hours+" "+ampm;

        minutes = minutes+"";
        if(minutes.length < 2)
            minutes="0"+minutes;

        return hours+":"+minutes+" "+ampm;
    }

    module.getNaturalDate = function(opts){
        var d = this;
        var refDate;
        if(opts && opts.referenceDate)
            refDate = opts.referenceDate;

        if(within_days(d, -1, -1, refDate))
            return "Yesterday";
        if(within_days(d,0,0, refDate))
            return "Today";
        if(within_days(d,1,1, refDate))
            return "Tomorrow";

        if(within_days(d,-7,0, refDate))
            return "Last "+day_to_string(d.getDay());
        if(within_days(d,0,7, refDate))
            return "This "+day_to_string(d.getDay());
        if(within_days(d,7,14, refDate))
            return "Next "+day_to_string(d.getDay())+" the "+number_endings(d.getDate());

        var month = month_to_string(d.getMonth());
        var day = number_endings(d.getDate());
        var result = [month, day];
        if(!within_days(d, -365/2, 365/2))
            result.push(d.getFullYear());
        return result.join(" ");
    };

    module.toNaturalString = function(opts){
        var d = this;
        var refDate;
        if(opts && opts.referenceDate)
            refDate = opts.referenceDate;

        if(!within_days(d,0,0, refDate))
            return this.getNaturalDate(opts) + " at " + this.getNaturalTime(opts);
        
    };



    //HELPERS
    function minutes_diff(diff){
        if(diff>=0 && diff<15)              return diff+plural(" minute", diff)+" from now";
        else if(diff>=15  && diff < 55)     return Math.round(diff/5)*5 + plural(" minute", diff)+" from now";
        else if(diff>=55  && diff<12*60)    return Math.round(diff/60)+plural(" hour", diff)+" from now";
        else if(diff<=0   && diff>-15)      return -1*diff+plural(" minute", diff)+" ago";
        else if(diff<=-15 && diff > -55)    return -1*Math.round(diff/5)*5 +plural(" hour", diff)+" ago";
        else if(diff<=-55 && diff>-12*60)   return -1*Math.round(diff/60)+plural(" minute", diff)+" ago";
        else                                return "Today at "+d.pretty_time();
    }

    var pluralize = function(num, word){
        return num + " " +word+(num==1 ? "" : "s");
    }

    var within_days = function(d, start, finish, refDate){
        var today = refDate || Date.natural.referenceDate || new Date();
        var one_day = 1000*60*60*24;
        var diff = Math.ceil((d.getTime() - today.getTime())/one_day);
        return (diff >= start && diff <= finish);
    }
    var within_minutes = function(d, start, finish, refDate){
        var today = refDate || Date.natural.referenceDate || new Date();
        var one_min = 1000*60;
        var diff = Math.ceil((d - today)/one_min);
        return (diff >= start && diff <= finish);
    }

    var number_endings = function(n){
        if(n>10 && n<14) return n+"th"; //special case 11th - 13th
        switch(n%10){
            case 1:  return n+"st";
            case 2:  return n+"nd";
            case 3:  return n+"rd";
            default: return n+"th";
        }
    };
    
    var day_to_string = function(d){
        return [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ][d];
    };

    var month_to_string = function(m){
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ][m];
    };
    return D;
}(Date));
