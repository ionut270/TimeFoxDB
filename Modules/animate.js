
function animation() {
	var P = ["|", "/", "-", "\\", "|", "/", "-", "\\"];
	if(animationIndex === 8 ){
		animationIndex = 0;
	}
	if(loading){
		process.stdout.write("\rLoading [\x1b[31m" + P[animationIndex] + "\x1b[0m]");
		setTimeout(animation(animationIndex++),1500);
	}
}
