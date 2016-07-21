declare var d3: any;

export function interpolatedProjection(a, b) {
			function raw(λ, φ) {
				var pa = a([λ *= 180 / Math.PI, φ *= 180 / Math.PI]);
				var pb = b([λ, φ]);
				return [(1 - α) * pa[0] + α * pb[0], (α - 1) * pa[1] - α * pb[1]];
			}

			var projection = d3.geo.projection(raw).scale(1);
			var center = projection.center;
			var translate = projection.translate;
			var α;

			projection.alpha = function(_) {
				if (!arguments.length) {
					return α;
				}

				α = +_;
				var ca = a.center();
				var cb = b.center();
				var ta = a.translate();
				var tb = b.translate();
				center([(1 - α) * ca[0] + α * cb[0], (1 - α) * ca[1] + α * cb[1]]);
				translate([(1 - α) * ta[0] + α * tb[0], (1 - α) * ta[1] + α * tb[1]]);
				return projection;
			};

			delete projection.scale;
			delete projection.translate;
			delete projection.center;
			return projection.alpha(0);
		}

		// Utility function for moving (from http://bl.ocks.org/patricksurry/5721459)

export function trackballAngles(projection, pt) {
			var r = projection.scale();
			var c = projection.translate();
			var x = pt[0] - c[0];
			var y = -(pt[1] - c[1]);
			var ss = x * x + y * y;

			var z = r * r > 2 * ss ?
				Math.sqrt(r * r - ss) :
				r * r / 2 / Math.sqrt(ss);

			var lambda = Math.atan2(x, z) * 180 / Math.PI;
			var phi = Math.atan2(y, z) * 180 / Math.PI;
			return [lambda, phi];
		}

		export function composedRotation(λ, ϕ, γ, δλ, δϕ) {
			var γ_, ϕ_, λ_;
			λ = Math.PI / 180 * λ;
			ϕ = Math.PI / 180 * ϕ;
			γ = Math.PI / 180 * γ;
			δλ = Math.PI / 180 * δλ;
			δϕ = Math.PI / 180 * δϕ;

			var sλ = Math.sin(λ);
			var sϕ = Math.sin(ϕ);
			var sγ = Math.sin(γ);
			var sδλ = Math.sin(δλ);
			var sδϕ = Math.sin(δϕ);
			var cλ = Math.cos(λ);
			var cϕ = Math.cos(ϕ);
			var cγ = Math.cos(γ);
			var cδλ = Math.cos(δλ);
			var cδϕ = Math.cos(δϕ);

			var m00 = -sδλ * sλ * cϕ + (sγ * sλ * sϕ + cγ * cλ) * cδλ;
			var m01 = -sγ * cδλ * cϕ - sδλ * sϕ;
			// var m02 = sδλ * cλ * cϕ - (sγ * sϕ * cλ - sλ * cγ) * cδλ;
			var m10 = -sδϕ * sλ * cδλ * cϕ - (sγ * sλ * sϕ + cγ * cλ) * sδλ * sδϕ -
				(sλ * sϕ * cγ - sγ * cλ) * cδϕ;
			var m11 = sδλ * sδϕ * sγ * cϕ - sδϕ * sϕ * cδλ + cδϕ * cγ * cϕ;
			// var m12 = sδϕ * cδλ * cλ * cϕ + (sγ * sϕ * cλ - sλ * cγ) * sδλ * sδϕ +
			//  (sϕ * cγ * cλ + sγ * sλ) * cδϕ;
			var m20 = -sλ * cδλ * cδϕ * cϕ - (sγ * sλ * sϕ + cγ * cλ) * sδλ * cδϕ +
				(sλ * sϕ * cγ - sγ * cλ) * sδϕ;
			var m21 = sδλ * sγ * cδϕ * cϕ - sδϕ * cγ * cϕ - sϕ * cδλ * cδϕ;
			var m22 = cδλ * cδϕ * cλ * cϕ + (sγ * sϕ * cλ - sλ * cγ) * sδλ * cδϕ -
				(sϕ * cγ * cλ + sγ * sλ) * sδϕ;

			if (m01 !== 0 || m11 !== 0) {
				γ_ = Math.atan2(-m01, m11);
				ϕ_ = Math.atan2(-m21, Math.sin(γ_) === 0 ?
					m11 / Math.cos(γ_) : -m01 / Math.sin(γ_));
				λ_ = Math.atan2(-m20, m22);
			} else {
				γ_ = Math.atan2(m10, m00) - m21 * λ;
				ϕ_ = -m21 * Math.PI / 2;
				λ_ = λ;
			}

			return ([λ_ * 180 / Math.PI, ϕ_ * 180 / Math.PI, γ_ * 180 / Math.PI]);
		}