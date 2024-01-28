"use client"
import Linkify from 'react-linkify'


import React from "react";

export default function TextLink({children}) {
  return (
    <Linkify>
      {children}
    </Linkify>
  )
}
