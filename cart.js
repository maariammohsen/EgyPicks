const stripe = Stripe(
  'pk_test_51QRZMZFMOzFwL4Tk2boaWeTFErE4l3dY2cNpvuOdk95Y6CFdFWEU6XoLrE9VAQmU5x5Cif2EinCK3GI19wG4d4hl002CgVevLL'
);
// let shippingFees = 70;
// let vat;
// let subTotal;
// let totalPrice;

// // let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

// // if (localStorage.getItem('cartProducts') === null) {
// //   localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
// // }

// let emptyBox = document.querySelector('.empty-box');
// let progressBar = document.querySelector('.progress-bar');
// let cartContainer = document.querySelector('.cart-container');

// // Target the tbody
// const tbody = document.getElementById('product-list');

// let cardTemplate = (product) => {
//   let subtotal = product.price * product.quantityRequested;
//   return `
//     <td>
//       <div class="card-body">
//         <button class="remove-button" onclick="removeProduct('${
//           product._id
//         }', 'cartProducts')">
//           <svg width="35" height="35" viewBox="0 0 47 45" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M19.3799 22.5V31.875" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M27.1318 22.5V31.875" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M7.75195 13.125H38.7599" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M11.6279 18.75V33.75C11.6279 36.8567 14.2309 39.375 17.4419 39.375H29.0699C32.2809 39.375 34.8839 36.8567 34.8839 33.75V18.75" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M17.4419 9.375C17.4419 7.30393 19.1772 5.625 21.3179 5.625H25.1939C27.3346 5.625 29.0699 7.30393 29.0699 9.375V13.125H17.4419V9.375Z" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>
//         </button>
//         <img onclick="openProduct('${
//           product._id
//         }')" src="../../public/images/localbrands/products/${
//     product.photo
//   }" alt="${product.name}" />
//         <div class="product-info">
//           <h3 onclick="openProduct('${product._id}')">${product.name}</h3>
//           <a>Customize</a>
//         </div>
//       </div>
//     </td>
//     ${product.size ? `<td>${product.size}</td>` : '<td>custom</td>'}
//     <td><span id="price${product._id}">${product.price}</span> EGP</td>
//     <td>
//       <div class="count">
//         <button class="minus-icon icon" onclick="decreaseQuantity2('${
//           product._id
//         }')">-</button>
//         <span id="count-num${product._id}" class="count-num">${
//     product.quantityRequested
//   }</span>
//         <button class="blus-icon icon" onclick="increaseQuantity2('${
//           product._id
//         }')">+</button>
//       </div>
//     </td>
//     <td id="subtotal${product._id}">${subtotal} EGP</td>
//   `;
// };

// let orderSummaryCardTemplate = (product) => {
//   return `
//     <div class="card">
//       <div class="card-body">
//         <button class="remove-button" onclick="removeProduct('${
//           product._id
//         }', 'cartProducts')">
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 30 30"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M15 26.2969C11.8359 26.2969 8.85938 25.0547 6.63281 22.8281C4.40625 20.6016 3.16406 17.625 3.16406 14.4609C3.16406 11.2969 4.40625 8.32031 6.63281 6.09375C8.85938 3.86719 11.8359 2.625 15 2.625C18.1641 2.625 21.1406 3.86719 23.3672 6.09375C27.9844 10.7109 27.9844 18.2109 23.3672 22.8281C21.1406 25.0547 18.1641 26.2969 15 26.2969ZM15 4.03125C12.2109 4.03125 9.58594 5.10938 7.61719 7.07812C5.64844 9.04688 4.57031 11.6719 4.57031 14.4609C4.57031 17.25 5.64844 19.875 7.61719 21.8438C9.58594 23.8125 12.2109 24.8906 15 24.8906C17.7891 24.8906 20.4141 23.8125 22.3828 21.8438C26.4609 17.7656 26.4609 11.1562 22.3828 7.07812C20.4141 5.10938 17.7891 4.03125 15 4.03125Z"
//               fill="black"
//             />
//             <path
//               d="M20.7385 9.6498L10.1981 20.1899L9.27002 19.2618L19.8103 8.72168L20.7385 9.6498Z"
//               fill="black"
//             />
//             <path
//               d="M9.60938 9.98437L10.5469 9.07031L20.7422 19.2656L19.8047 20.2031L9.60938 9.98437Z"
//               fill="black"
//             />
//           </svg>
//         </button>
//         <img
//           src="../../public/images/localbrands/products/${product.photo}"
//           alt="${product.name}"
//         />
//         <div class="product-info">
//           <h3>${product.name}</h3>
//         </div>
//       </div>
//       <p class="price">${product.price * product.quantityRequested} EGP</p>
//     </div>
//   `;
// };

// // if (cartProducts && cartProducts.length > 0) {
// //   async function renderTableProducts() {
// //     // Create cards from cardTemplate
// //     let cartProductsHTML = cartProducts
// //       .map((product) => {
// //         cardTemplate(product);
// //       })
// //       .join('');

// //     tbody.innerHTML = cartProductsHTML;

// //     // Pass cartProducts to allCalcs for calculations
// //     allCalcs(cartProducts);

// //     cartProducts.forEach((product) => {
// //       const row = document.createElement('tr');
// //       row.innerHTML = cardTemplate(product);
// //       tbody.appendChild(row);

// //       // Create order summary cards
// //       const orderSummaryCard = document.createElement('div');
// //       orderSummaryCard.innerHTML = orderSummaryCardTemplate(product);
// //       document
// //         .getElementById('order-summary-cards')
// //         .appendChild(orderSummaryCard);
// //     });

// //     return cartProducts;
// //   }

// //   renderTableProducts();

// //   emptyBox.style.display = 'none';
// // } else {
// //   emptyBox.style.display = 'flex';
// //   cartContainer.style.display = 'none';
// //   progressBar.style.display = 'none';
// // }

// // function allCalcs(cartProducts) {
// //   vat = cartProducts.reduce((sum, product) => sum + product.price, 0) * 0.2;
// //   subTotal = cartProducts.reduce(
// //     (sum, product) => sum + product.price * product.quantityRequested,
// //     0
// //   );
// //   totalPrice = vat + subTotal + shippingFees;

// //   document.getElementById('subTotal').innerText = subTotal;
// //   document.getElementById('shipping-fees').innerText = shippingFees;
// //   document.getElementById('vat').innerText = vat;
// //   document.getElementById('totalPrice').innerText = totalPrice;
// //   const tbody = document.querySelector('#cart-table tbody');
// // }

// // document.getElementById('continue-shopping').addEventListener('click', () => {
// //   window.location.href = '../../views/pages/home.html';
// // });

// // // Populate table on page load
// // if (cartProducts.length > 0) {
// //   emptyBox.style.display = 'none';
// // } else {
// //   emptyBox.style.display = 'flex';
// //   progressBar.style.display = 'none';
// //   cartContainer.style.display = 'none';
// // }

// // // Target all the buttons
// // document.querySelectorAll('.question-btn').forEach((button) => {
// //   button.addEventListener('click', () => {
// //     const answer = button.nextElementSibling;

// //     button.classList.toggle('active');

// //     if (button.classList.contains('active')) {
// //       answer.style.maxHeight = answer.scrollHeight + 'px';
// //     } else {
// //       answer.style.maxHeight = '0';
// //     }
// //   });
// // });

// // let inShowContainers = document.querySelectorAll('.in-show');

// // let steps = document.querySelectorAll('.step');
// // let lines = document.querySelectorAll('.line');

// // // find all the steps and lines and add active class to them
// // async function show(id) {
// //   allCalcs(cartProducts);

// //   const targetElement = document.getElementById(id);
// //   if (!targetElement) {
// //     console.error(`Error: Element with id "${id}" does not exist.`);
// //     return;
// //   }

// //   inShowContainers.forEach((container) => {
// //     container.style.display = 'none';
// //   });

// //   targetElement.style.display = 'block';

// //   steps.forEach((step) => {
// //     step.classList.remove('active');
// //   });
// //   lines.forEach((line) => {
// //     line.classList.remove('active');
// //   });

// //   let currentStep = document.querySelector(`[onclick="show('${id}')"]`);
// //   let currentLine = currentStep.previousElementSibling;

// //   let allSteps = Array.from(steps);
// //   let allLines = Array.from(lines);

// //   let stepIndex = allSteps.indexOf(currentStep);
// //   allSteps
// //     .slice(0, stepIndex + 1)
// //     .forEach((step) => step.classList.add('active'));
// //   allLines.slice(0, stepIndex).forEach((line) => line.classList.add('active'));
// // }

// // let countNum2;

// // function increaseQuantity2(id) {
// //   const product = cartProducts.find((product) => product._id === id);
// //   countNum2 = Number(document.getElementById(`count-num${id}`).innerText);

// //   if (countNum2 < product.quantity) {
// //     countNum2++;
// //   }

// //   if (document.getElementById(`subtotal${id}`)) {
// //     document.getElementById(`subtotal${id}`).innerText =
// //       countNum2 * Number(document.getElementById(`price${id}`).innerText) +
// //       ' EGP';
// //   }

// //   let subtotalText = document.getElementById(`subtotal${id}`).innerText;

// //   document.getElementById(`count-num${id}`).innerText = countNum2;

// //   if (product) {
// //     product.quantityRequested = Number(
// //       document.getElementById(`count-num${id}`).innerText
// //     );
// //   }
// //   localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
// // }

// // function decreaseQuantity2(id) {
// //   const product = cartProducts.find((product) => product._id === id);
// //   countNum2 = Number(document.getElementById(`count-num${id}`).innerText);

// //   if (countNum2 > 1) {
// //     countNum2--;
// //   }

// //   if (document.getElementById(`subtotal${id}`)) {
// //     document.getElementById(`subtotal${id}`).innerText =
// //       countNum2 * Number(document.getElementById(`price${id}`).innerText) +
// //       ' EGP';
// //   }

// //   // update price
// //   let subtotalText = document.getElementById(`subtotal${id}`).innerText;

// //   // update quanyity
// //   document.getElementById(`count-num${id}`).innerText = countNum2;

// //   if (product) {
// //     product.quantityRequested = Number(
// //       document.getElementById(`count-num${id}`).innerText
// //     );
// //   }

// //   // update Local Storage
// //   localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
// // }

// // function getCookie(name) {
// //   const value = `; ${document.cookie}`;
// //   const parts = value.split(`; ${name}=`);
// //   if (parts.length === 2) return parts.pop().split(';').shift();
// // }

// // // Validate shipping details before sending
// // function validateShippingDetails(details) {
// //   const requiredFields = [
// //     'firstName',
// //     'lastName',
// //     'country',
// //     'governorate',
// //     'city',
// //     'address',
// //     'mobile',
// //     'email',
// //   ];

// //   for (const field of requiredFields) {
// //     if (!details[field] || details[field].trim() === '') {
// //       console.error(`The field ${field} is required.`);
// //       alert(`The field ${field} is required.`);
// //       return false;
// //     }
// //   }

// //   if (!/\S+@\S+\.\S+/.test(details.email)) {
// //     console.error('Invalid email format.');
// //     alert('Invalid email format.');
// //     return false;
// //   }

// //   return true;
// // }

// // Handle order submission
async function submitOrder(orderData) {
  // const token = getCookie('authToken');

  // if (!token) {
  //   alert('You must be logged in to complete the order.');
  //   return;
  // }

  try {
    const response = await fetch(
      'https://egy-picks-nightstalker5699s-projects.vercel.app/api/v1/orders/checkout-session',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTI0MDQ1ZDg2MDM3ZjExMjNmMGRlMSIsImlhdCI6MTczNDI2ODQ1NiwiZXhwIjoxNzQyMDQ0NDU2fQ.3gPfJ_Y1BER-0iuAuozBcM7WzLgTySiyWg6oBVFv8HE`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appliedDiscount: '67657eef27760c468fcc9b98',
          paymentType: 'Online Payment',
          orderAddress: '675f3882434814227a83cf8b',
          productsDetails: [
            {
              product: '674cbb8ed71aef32733f128f',
              price: 230,
              quantity: 2,
              size: 'm,l',
            },
            {
              product: '674cbd20d71aef32733f129d',
              price: 200,
              quantity: 2,
              size: 'm',
            },
            {
              product: '674ba5b98f23b79e70cbceed',
              price: 655,
              quantity: 1,
              size: ' ',
            },
          ],
        }),
        //  JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error(response.message);
    }

    const data = await response.json();
    await stripe.redirectToCheckout({
      sessionId: data.data.session.id,
    });
    // console.log('Order submitted successfully:', data);
    // alert('Your order has been submitted successfully!');
  } catch (error) {
    console.log('Error submitting order:', error.message);
    alert('Failed to submit your order. Please try again later.');
  }
}

document
  .getElementById('complete-order-btn')
  .addEventListener('click', async function () {
    // if (!cartProducts || cartProducts.length === 0) {
    //   console.error('No products found in cartProducts.');
    //   alert('No products found in your order.');
    //   return;
    // }

    // const productsDetails = cartProducts.map((product) => {
    //   const sizes =
    //     product.selectedSize && Array.isArray(product.selectedSize)
    //       ? product.selectedSize.join(',')
    //       : '';

    //   return {
    //     product: product._id,
    //     price: product.price,
    //     quantity: product.quantityRequested,
    //     size: 'sizes',
    //   };
    // });

    // const orderData = {
    //   productsDetails: productsDetails,
    // };

    // console.log(JSON.stringify(orderData, null, 2));

    // await submitOrder(JSON.stringify(orderData, null, 2));
    await submitOrder('test');
  });
