console.log("Script loaded succesfully");

// Dom objects
const bill_input = document.getElementById('bill');
const tip_btn_list = document.querySelectorAll('.tip_perc');
const custom_tip = document.getElementById('customTip');
const count_ppl_input = document.getElementById('people');
const reset_btn = document.getElementById('reset_btn');
const tip_span = document.querySelector('.js_tip');
const total_span = document.querySelector('.js_total');
const error_span = document.querySelectorAll('.no_zero_text');
//



let tip_perc = 0
// var functions
handle_tip = (e) => {
    tip_btn_list.forEach(tip_btn => {   
        tip_btn.style.backgroundColor = 'var(--green_neutral)'
        tip_btn.style.color = 'var(--white)'
    })

    custom_tip.value = ''
    e.target.style.backgroundColor = 'var(--green_active)';
    e.target.style.color = 'var(--green_neutral)';
    e_value = e.target.textContent.slice(0,-1)
    tip_perc = Number(e_value)
};

handle_custom_tip = (e) => {
    e_value = e.target.value
    e_value = Number(e_value)
    e_value = e_value.toFixed(0)

    tip_btn_list.forEach(tip_btn => {   
        tip_btn.style.backgroundColor = 'var(--green_neutral)'
        tip_btn.style.color = 'var(--white)'
    })

    tip_perc = e_value

}

calculate_results = (e) =>{
    // Getting the values
    let bill_val = validate_input(bill_input, error_span);
    let no_of_people = validate_input(count_ppl_input, error_span)
    
    // Results calcution
    let tip_amnt = get_tip_amnt(bill_val, tip_perc, no_of_people)
    let total_amnt = get_total_amnt(bill_val, tip_amnt, no_of_people)
    
    // Output to the DOM
    tip_span.textContent = `$${tip_amnt}`
    total_span.textContent = `$${total_amnt}`
}
//


//Event listeners
bill_input.addEventListener('input', calculate_results)
custom_tip.addEventListener('input', handle_custom_tip)
custom_tip.addEventListener('input', calculate_results)
count_ppl_input.addEventListener('input', calculate_results)

tip_btn_list.forEach(tip_btn => {
    tip_btn.addEventListener('click', handle_tip)
    tip_btn.addEventListener('click', calculate_results)
})

reset_btn.addEventListener('click', ()=>{
    location.reload()
})
//



// Functions
function get_tip_amnt(bill_value, tip_perc, no_of_people){
    let tip_amnt = (bill_value*100) * (tip_perc/100);
    tip_amnt = ((tip_amnt/no_of_people)/100).toFixed(2);
    return tip_amnt;
}

function get_total_amnt(bill_value, tip_amount, no_of_people){
    let total_amnt = ((bill_value * 100)/no_of_people) + (tip_amount * 100);
    total_amnt = (total_amnt/100).toFixed(2);
    return total_amnt;
}

function validate_input(input, error_span = null){
    const error_map = {
        bill: 0,
        people: 1  
    }
    const value = Number(input.value)
    const error_index = error_map[input.id]
    const is_invalid = value <= 0
    
    input.style.borderColor = is_invalid ? 'var(--red)' : 'transparent'
    input.style.outlineColor = is_invalid ? 'var(--red)' : 'var(--green_active)'

    if (error_span && error_index != undefined){
        error_span[error_index].style.display = is_invalid ? 'block' : 'none'
    }

    return is_invalid ? null: value
}

//
