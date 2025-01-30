import { resources } from "./ressurser.js";

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("header ul li"); 
  const main = document.querySelector("main"); 

  function updateContent(category) {

    main.innerHTML = "";

    const heading = document.createElement("h1");
    heading.textContent = category;
    main.appendChild(heading);

    const filteredResources = resources.filter(
      (res) => res.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredResources.length > 0) {
      const selectedResource = filteredResources[0];

      const description = document.createElement("p");
      description.textContent = selectedResource.text;
      main.appendChild(description);

      const sourcesList = document.createElement("ul");
      selectedResource.sources.map((source) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = source.title;
        link.href = source.url;
        link.target = "_blank"; 
        listItem.appendChild(link);
        sourcesList.appendChild(listItem);
      });
      main.appendChild(sourcesList);
    } else {

      const errorMsg = document.createElement("p");
      errorMsg.textContent = "Ingen ressurser funnet for denne kategorien.";
      main.appendChild(errorMsg);
    }
  }


  function setActiveCategory(clickedItem) {

    navItems.forEach((item) => item.classList.remove("active"));

    clickedItem.classList.add("active");
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const category = item.textContent.trim(); 
      setActiveCategory(item); 
      updateContent(category); 
    });
  });

  const defaultCategory = navItems[0];
  setActiveCategory(defaultCategory); 
  updateContent("HTML");
});
