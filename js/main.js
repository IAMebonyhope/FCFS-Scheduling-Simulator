var processBurstTimes = [];
var lastProcessID = 1;

function goToPage2(){
    console.log($("#noOfProcesses").val());

    if(($("#noOfProcesses").val().length == 0)){
        $("#noOfProcessesError").text("please input a valid number");
        return;
    }

    var noOfProcesses = parseInt($("#noOfProcesses").val(), 10);

    if((noOfProcesses > 10)){
        $("#noOfProcessesError").text("Number of processes should be less than 10");
        return;
    }    

    $("#noOfProcessesError").text("");

    $('#exampleModal').modal('hide');
    $("#page1").hide();
    $("#page2").fadeIn("slow");

    for (i = 0; i < noOfProcesses; i++) { 
        var row = `<tr>
                        <td>${i+1}</td>
                        <td><input type="number" class="form-control" name="burstTimes[]"></td>
                    </tr>`;
        $("#processEntry").append(row);
    }
}

function goToPage3(){

    processBurstTimes = [];

    var burstTimes = $('input[name^=burstTimes]').map(function(idx, elem) {
        return $(elem).val();
    }).get();

    console.log(burstTimes);
    
    for(burstTime of burstTimes){
        if(burstTime.length == 0){
            $("#processEntryError").text("please fill all fields with a valid number");
            return;
        }
    }
    $("#processEntryError").text("");

    for(burstTime of burstTimes){
        var process = {};
        process.ID = lastProcessID;
        process.BurstTime = parseInt(burstTime, 10);
        processBurstTimes.push(process);

        lastProcessID++;
    }

    console.log(processBurstTimes);

    $("#page2").hide();
    $("#page3").fadeIn("slow");

    createProcessTable();
    calculateAverageWaitingTime();
    getNewProcessID();
    startAnimation();
}

function createProcessTable(){
    $("#processTable").html("");
    for (i = 0; i < processBurstTimes.length; i++) { 
        var row = `<tr>
                        <td>${processBurstTimes[i].ID}</td>
                        <td>${processBurstTimes[i].BurstTime}</td>
                    </tr>`;
        $("#processTable").append(row);
    }
}

function calculateAverageWaitingTime(){
    var total = 0;
    var n = processBurstTimes.length;

    for (i = 0; i < n; i++) { 
        total += processBurstTimes[i].BurstTime;
    }

    var average =  (total / n).toFixed(2);

    $("#averageTime").text(`Average Waiting Time: ${average}`);
}

function getNewProcessID(){

    $("#newProcess").text(`Process #: ${lastProcessID}`);
}

function startAnimation(){
    //isaac insert your js code here
    processBurstTimes.shift();
}

function addNewProcess(){
    console.log($("#newBurstTime").val());

    if(($("#newBurstTime").val().length == 0)){
        $("#newProcessError").text("please input a valid number");
        return;
    }

    var newBurstTime = parseInt($("#newBurstTime").val(), 10);

    process = {};
    process.ID = lastProcessID;
    process.BurstTime = newBurstTime;

    processBurstTimes.push(process);

    lastProcessID++;

    $('#exampleModal2').modal('hide');

    $("#page3").fadeIn("slow");

    createProcessTable();
    calculateAverageWaitingTime();
    getNewProcessID();
    startAnimation();
}