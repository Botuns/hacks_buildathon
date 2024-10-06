import LearningRequest from "@/app-components/forms/learn/create-learn";
import LearnFormHeader from "@/app-components/ui/learn-form-header";
import React from "react";

type Props = {};

function LearnPage({}: Props) {
  return (
    <div className="md:mx-[5%]">
      <LearnFormHeader />
      <LearningRequest />
    </div>
  );
}

export default LearnPage;
