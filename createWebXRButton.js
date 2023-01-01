export const createWebVRButton = (callback) => createWebXRButton(false, callback);
export const createWebARButton = (callback) => createWebXRButton(true, callback);

const createWebXRButton = (armode, callback) => {
	const button = document.createElement("button");

	function showEnterXR() {
		function onSessionStarted(session) {
			session.addEventListener("end", onSessionEnded);
			if (callback) {
				callback(session);
			}
			button.textContent = "EXIT XR";
		}

		function onSessionEnded(session) {
			session.removeEventListener("end", onSessionEnded);
			session.end().then(() => {
				button.textContent = "ENTER XR";
			});
		}

		button.style.display = "";

		button.style.cursor = "pointer";
		button.style.left = "calc(50% - 50px)";
		button.style.width = "100px";

		button.textContent = "ENTER XR";

		button.onmouseenter = function () { button.style.opacity = "1.0"; };
		button.onmouseleave = function () { button.style.opacity = "0.5"; };

		button.onclick = function () {
			const mode = armode ? "immersive-ar" : "immersive-vr";
			const opt = { optionalFeatures: [ "local-floor", "bounded-floor", "hand-tracking" ] };
			navigator.xr.requestSession(mode, opt).then(function(session) {
				onSessionStarted(session);
			}).catch(showXRNotFound);	
		};
	}

	function showXRNotFound() {
		button.style.display = "";
		button.style.cursor = "auto";
		button.style.left = "calc(50% - 75px)";
		button.style.width = "150px";
		button.textContent = "VR NOT FOUND";
		button.onmouseenter = null;
		button.onmouseleave = null;
		button.onclick = null;
	}

	function stylizeElement(element) {
		element.style.position = "absolute";
		element.style.bottom = "20px";
		element.style.padding = "12px 6px";
		element.style.border = "1px solid #fff";
		element.style.borderRadius = "4px";
		element.style.background = "transparent";
		element.style.color = "#fff";
		element.style.font = "normal 13px sans-serif";
		element.style.textAlign = "center";
		element.style.opacity = "0.5";
		element.style.outline = "none";
		element.style.zIndex = "999";
	}

	if ("xr" in navigator) {
		button.style.display = "none";

		stylizeElement(button);

		const mode = armode ? "immersive-ar" : "immersive-vr";
		navigator.xr.isSessionSupported(mode).then((supported) => {
			if (supported) {
				showEnterXR();
			} else {
				armode = false;
				navigator.xr.isSessionSupported("immersive-vr").then((supported) => {
					if (supported) {
						showEnterXR();
					} else {
						showXRNotFound();
					}
				}).catch(showXRNotFound);
			}
		}).catch(showXRNotFound);
		return button;
	}
	const message = document.createElement("a");
	message.href = "https://webvr.info";
	message.innerHTML = "WEBVR NOT SUPPORTED";

	message.style.left = "calc(50% - 90px)";
	message.style.width = "180px";
	message.style.textDecoration = "none";

	stylizeElement(message);
	return message;
};
