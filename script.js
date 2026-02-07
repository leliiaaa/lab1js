console.log("Доступні типи: 'leg', 'hypotenuse', 'adjacent angle', 'opposite angle'");
console.log("Порядок аргументів: (значення1, тип1, значення2, тип2)");
console.log("Приклад: triangle(7, 'leg', 18, 'hypotenuse');");

function triangle(val1, type1, val2, type2) {
    const TO_DEG = 180 / Math.PI;
    const TO_RAD = Math.PI / 180;

    // Перевірка на некоректні (від'ємні або нульові) 
    if (val1 <= 0 || val2 <= 0) {
        console.log("Zero or negative input");
        return "Zero or negative input";
    }

    let a, b, c, alpha, beta;
    const items = [{v: val1, t: type1}, {v: val2, t: type2}];

    // функції для пошуку
    const getV = (type) => items.find(i => i.t === type)?.v;
    const has = (t1, t2) => (type1 === t1 && type2 === t2) || (type1 === t2 && type2 === t1);

    try {
        // катет і гіпотенуза
        if (has("leg", "hypotenuse")) {
            a = getV("leg");
            c = getV("hypotenuse");
            if (a >= c) {
                console.log("Катет не може бути більшим за гіпотенузу [cite: 38]");
                return "failed";
            }
            b = Math.sqrt(Math.pow(c, 2) - Math.pow(a, 2)); // теорема піфагора
            alpha = Math.asin(a / c) * TO_DEG;
            beta = 90 - alpha;
        }
        // два катети
        else if (type1 === "leg" && type2 === "leg") {
            a = val1;
            b = val2;
            c = Math.sqrt(a * a + b * b);
            alpha = Math.atan(a / b) * TO_DEG;
            beta = 90 - alpha;
        }
        // катет і прилеглий кут
        else if (has("leg", "adjacent angle")) {
            a = getV("leg");
            beta = getV("adjacent angle");
            if (beta >= 90) return "failed"; // перевірка на гострий кут 
            c = a / Math.cos(beta * TO_RAD);
            b = Math.sqrt(c * c - a * a);
            alpha = 90 - beta;
        }
        // катет і протилежний кут
        else if (has("leg", "opposite angle")) {
            a = getV("leg");
            alpha = getV("opposite angle");
            if (alpha >= 90) return "failed";
            c = a / Math.sin(alpha * TO_RAD);
            b = Math.sqrt(c * c - a * a);
            beta = 90 - alpha;
        }
        // гіпотенуза і гострий кут 
        else if (has("hypotenuse", "angle")) {
            c = getV("hypotenuse");
            alpha = getV("angle");
            if (alpha >= 90) return "failed";
            a = c * Math.sin(alpha * TO_RAD);
            b = c * Math.cos(alpha * TO_RAD);
            beta = 90 - alpha;
        }

        else {
            console.log("Помилка: Неправильні типи або несумісна пара. Перечитайте інструкцію.");
            return "failed";
        }

        // вивід результатів 
        // познач: a, b (катети), c (гіпотенуза), alpha, beta (кути) 
        console.log(`a = ${a}`);
        console.log(`b = ${b}`);
        console.log(`c = ${c}`);
        console.log(`alpha = ${alpha}`);
        console.log(`beta = ${beta}`);

        return "success"; 

    } catch (e) {
        return "failed";
    }
}