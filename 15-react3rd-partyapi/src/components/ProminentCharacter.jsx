import React from "react";

import './ProminentCharacter.css'

function ProminentCharacter(props) {
	return (
		<div className="container">
			<div className="row">
				<div className="col-lg-12 mb-4 mb-sm-5">
					<div className="card card-style1 border-0">
						<div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
							<div className="row align-items-left">
								<div className="col-lg-6 mb-4 mb-lg-0">
									<img src={`/images/${props.character.image}`} alt="..." className="characterImage"/>
								</div>
								<div className="col-lg-6 px-xl-10">
									<div className="d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
										<h3 className="h2 mb-0">{props.character.name}</h3>
										<span className="text-primary">{props.character.affiliation}</span>
									</div>
									<div className="d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
										<p>{props.character.bio}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<span className="section-title text-primary mb-3 mb-sm-4">Comments</span>
			</div>
		</div>
	);
}

export default ProminentCharacter;