@app.route("/samples/<sample>")
def samples(sample):
    """Return `otu_ids`, `otu_labels`,and `sample_values`."""
    stmt = db.session.query(Samples).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
    # Format the data to send as json
    data = {
        "otu_ids": sample_data.otu_id.values.tolist(),
        "sample_values": sample_data[sample].values.tolist(),
        "otu_labels": sample_data.otu_label.tolist(),
    }
    return jsonify(data)

@app.route("/schoolsummary/<campus_id>")
def school_summary(campus_id):
    """Return the data to populate into school summary panel"""
    sel = [
        Schools_Summary.campus_name,
        Schools_Summary.address,
        Schools_Summary.zipcode,
        Schools_Summary.phone,
        Schools_Summary.county,
        Schools_Summary.district,
        Schools_Summary.enrollment,
        Schools_Summary.grade_range,
        Schools_Summary.student_teacher_ratio,
        Schools_Summary.pct_eco_dis
    ]

    school_summary_results = db.session.query(*sel).filter(Schools_Summary.campus_id == campus_id).all()

    # Create a dictionary entry for each row of metadata information
    school_summary = {}
    for result in school_summary_results:
        school_summary["Campus Name"] = result[0]
        school_summary["Address"] = result[1]
        school_summary["Zipcode"] = result[2]
        school_summary["Phone Number"] = result[3]
        school_summary["County"] = result[4]
        school_summary["District"] = result[5]
        school_summary["Enrollment Size"] = result[6]
        school_summary["Grade Range"] = result[7]
        school_summary["Student/Teacher Ratio"] = result[8]
        school_summary["Pct Eco Dis"] = result[9]

    print("school_summary is....")
    print(school_summary)
    return jsonify(school_summary)
