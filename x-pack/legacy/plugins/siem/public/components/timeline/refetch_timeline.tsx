/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { connect } from 'react-redux';
import { ActionCreator } from 'typescript-fsa';

import { inputsModel } from '../../store';
import { inputsActions } from '../../store/actions';
import { InputsModelId } from '../../store/inputs/constants';

interface TimelineRefetchDispatch {
  setTimelineQuery: ActionCreator<{
    id: string;
    inputId: InputsModelId;
    inspect: inputsModel.InspectQuery | null;
    loading: boolean;
    refetch: inputsModel.Refetch;
  }>;
}

interface TimelineRefetchProps {
  children: React.ReactNode;
  id: string;
  inspect: inputsModel.InspectQuery | null;
  loading: boolean;
  refetch: inputsModel.Refetch;
}

type OwnProps = TimelineRefetchDispatch & TimelineRefetchProps;

class TimelineRefetchComponent extends React.PureComponent<OwnProps> {
  public componentDidUpdate(prevProps: OwnProps) {
    const { loading, id, inspect, refetch } = this.props;
    if (prevProps.loading !== loading) {
      this.props.setTimelineQuery({ id, inputId: 'timeline', inspect, loading, refetch });
    }
  }

  public render() {
    return <>{this.props.children}</>;
  }
}

export const TimelineRefetch = connect(
  null,
  {
    setTimelineQuery: inputsActions.setQuery,
  }
)(TimelineRefetchComponent);
