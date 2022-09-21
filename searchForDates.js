function searchForDates(content){
    const date = /(0?[1-9]|[12][0-9]|3[01])[- \.\/](0*[1-9]|1[012])[- \.\/](19|20|\d\d)/;
    let str = content;

    if(date.test(str)!=true){
        return '-'
    }

    let a =[];
    while(date.test(str) == true){
        let res = str.match(date)[0];
        str = str.replace(res, '')
        a.push(res)
    }
    let f = /\.|\-|\s/;
    a.forEach((elemet, index) => {
        if(f.test(elemet)==true){
            let b = elemet.split(f)
            a[index] = b.join('/')
        }
    })
    return a.join(',')
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
  
function formatDate(date) {
    return [
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        date.getFullYear(),
    ].join('/');
}