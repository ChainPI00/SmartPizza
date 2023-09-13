// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
//1, ["Olio"], 100, 100, 100 , 100, 100, 100, 100
contract SmartPizza {
    struct Pizza {
        uint256 orderId;
        string[] ingredients;
        uint256 tAmbiente;
        uint256 umidita;
        uint256 lievitazione1;
        uint256 lievitazione2;
        uint256 tPlatea;
        uint256 tForno;
        uint256 time;
    }

    mapping(uint256 => Pizza) private pizzas;
    uint256 private pizzaCount;

    event PizzaAdded(uint256 indexed orderId, uint256 indexed pizzaIndex);

    function addPizza(
        uint256 orderId,
        string[] memory ingredients,
        uint256 tAmbiente,
        uint256 umidita,
        uint256 lievitazione1,
        uint256 lievitazione2,
        uint256 tPlatea,
        uint256 tForno,
        uint256 time
    ) public {
        //require(orderId != 0, "Order ID must not be zero");
        //require(ingredients.length > 0, "Ingredients list must not be empty");
        // Add more validation checks as needed.

        pizzas[pizzaCount] = Pizza(orderId, ingredients, tAmbiente, umidita, lievitazione1, lievitazione2, tPlatea, tForno, time);
        emit PizzaAdded(orderId, pizzaCount);
        pizzaCount++;
    }

    function getPizzaCount() public view returns (uint256) {
        return pizzaCount;
    }

    function getPizzaByOrderId(uint256 orderId) public view returns (Pizza memory) {
    for (uint256 i = 0; i < pizzaCount; i++) {
        if (pizzas[i].orderId == orderId) {
            return pizzas[i];
        }
    }
    revert("Pizza not found");
}

    function getAllPizzas() public view returns (Pizza[] memory) {
        Pizza[] memory allPizzas = new Pizza[](pizzaCount);
        for (uint256 i = 0; i < pizzaCount; i++) {
            allPizzas[i] = pizzas[i];
        }
        return allPizzas;
    }
}
