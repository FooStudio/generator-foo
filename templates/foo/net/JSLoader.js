/**
 * Created by mendieta on 7/11/16.
 */


export default (url, callback, location = document.body)=> {
    let scriptTag = document.createElement("sctipt");
    scriptTag.src = url;

    scriptTag.onload = callback;
    scriptTag.onreadystatechange = callback;
    location.appendChild(scriptTag);
}
