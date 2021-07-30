export function sortList(list) {
  list.sort((a, b) => {
    let first;
    let second;
    if (a.Chapter_No) {
      first = Number(a.Chapter_No);
      second = Number(b.Chapter_No);
    } else {
      first = Number(a.Article_No);
      second = Number(b.Article_No);
    }
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  });
  return list;
}

export function LocaleString(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

export function generateSubHeadings() {
  // adding ids to h3 tags (subheadings)
  const allHeadings = document.querySelectorAll('h3');
  allHeadings.forEach((heading) => {
    const text = heading.childNodes[0].innerText;
    const id = text.toLowerCase().replace(/\W/g, '-');
    heading.setAttribute('id', id);
  });

  // adding subheadings to the sidebar for each article
  const articles = document.querySelectorAll('article');
  articles.forEach((article) => {
    const subHeadings = article.querySelectorAll('h3');
    if (subHeadings.length > 0) {
      const sideLink = document.querySelector(
        `div[keyid=${article.getAttribute('id')}]`
      );
      const subHeadingList = sideLink.querySelector('ul');

      // if list is already populated, return
      if (subHeadingList.childNodes.length > 0) return;

      // else populate
      subHeadings.forEach((subHeading) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.innerHTML = subHeading.childNodes[0].innerText;
        a.setAttribute('href', `#${subHeading.id}`);
        li.setAttribute('subid', subHeading.id);
        li.appendChild(a);
        subHeadingList.appendChild(li);
      });
    }
  });
}
